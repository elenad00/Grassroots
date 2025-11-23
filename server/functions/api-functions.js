import constructLog from "../utils/logger.js";
import { sql_select } from "./sql-handler.js";
import "../utils/types.js"

const log = constructLog("API Functions");

export function send_error(error, resp){
  console.log(`Error ${error.code}: ${error.message}`)
  resp.status(400).send({error: error});
  return
}

export async function check_if_user(user_data){
  const select_values = {
    select: "user_id",
    from: "users",
    where: `email_address='${user_data.email}'`
  }
  const {error, data} = await sql_select(select_values);
  console.log(data);
  return false;
}

export function create_user_cookie(user_data){
  log.info(`Creating cookie for user ${user_data}`);
  let date_expires;
  let date_now;
  try{
    date_now = Date.now();
    date_expires = Date.today().add(30).days();
  } catch (error){
    log.error(error)
    date_expires = "in a month";
    date_now = "now!";
  }
  const cookie = `Username=${user_data.username};CookieStart=${date_now};CookieExpires=${date_expires};`
  log.info(cookie)
  return cookie
}
