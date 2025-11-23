import { create_user_cookie, send_error } from "../../functions/api-functions.js";
import { create_user_otp } from "../../functions/otp-generator.js";
import express from "express";
import "../../utils/types.js"

export const otp_router = express.Router();

// Handles OTP sign on by emailing the user with the link
otp_router.get("/", async (req, resp) => {
  const email = req.headers.authentication;
  if (email == undefined){
    return send_error({code: "email_unset", message: "Email not set in message headers"},resp)
  }
  const otp_return = await create_user_otp(email);
  if (otp_return.error){
    return send_error(otp_return.error, resp)
  }
  resp.status(200).setHeader('Authorization', otp_return.data.unique_id).send();
})

// Handles verification of the OTP
otp_router.get("/:code", async (req, resp) => {
  const unique_id = req.headers.authorization;
  const code = req.params.code;
  try{
    const check_code = await sql_select({
      select: "request_value",
      from: "user_sign_in_requests",
      where: `request_id=${unique_id}`
    });
    if (check_code.data[0][0].request_value == code){
      const updated_line = await sql_update({
        table: "user_sign_in_requests",
        set: "sign_in_complete = true",
        where: `request_id = ${unique_id}`
      })
    } else{
      return send_error({code: "CODE_INCORRECT", message: "The code is incorrect"}, resp)
    }
    const username = await get_username(unique_id);
    if (!username){
      resp.status(200).send({cookie: false});
    } else{
      const user_cookie = await create_user_cookie({username: username});
      resp.status(200).cookie('grassroots', user_cookie).send({cookie: true});
    }
  } catch (error){
    return send_error(error, resp)
  }
})

function generate_otp() {
  let digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

async function create_user_otp(email){
  const otp = generate_otp();
  log.info(`Generated OTP Code ${otp}`);

  let d = new Date();
  let date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDay()} `
  let time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  const todays_date = date + time;
  try{
    const sql_return = await sql_insert({
      table: "user_sign_in_requests",
      columns: "request_time, sign_in_type, request_provider, request_value, user_attribute, sign_in_complete",
      values: `'${todays_date}', 'otp', 'otp', '${otp}', '${email}', false`
    });
    const unique_id = sql_return.data[0].insertId;
    log.info("OTP Added to Database")
    const auth_email_sent = await send_user_code(email, otp);
    return {unique_id: unique_id};
  } catch (error){
    return {error: error}
  }
};

async function get_username(unique_id){
  const sql_email_return = await sql_select({
    select: 'user_attribute',
    from: 'user_sign_in_requests',
    where: `request_id=${unique_id}`
  });
  const user_email = sql_email_return.data[0][0].user_attribute;
  const sql_username_return = await sql_select({
    select: 'username',
    from: 'users',
    where: `email_address='${user_email}'`
  });
  const username = sql_username_return.data[0];
  if (username.length > 0){
    return username[0]
  } else{
    return false
  }
}