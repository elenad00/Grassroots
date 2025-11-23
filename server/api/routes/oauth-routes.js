import axios from "axios";
import config from "../../utils/config.js";
import constructLog from "../../utils/logger.js";
import { create_user_cookie, send_error } from "../../functions/api-functions.js";

const log = constructLog("OAuth_Router");
export const oauth_router = express.Router();

// Gets the redirect url for the given provider
oauth_router.get("/:provider", async (req, res) => {
  const provider = req.params.provider;
  const redirect_url = config.oauth.redirect_url;
  log.info(`Getting URL for ${provider}`)
  try{
    const {url, response_type, scope} = config.oauth[provider].get;
    const provider_url = (
      `${url}?client_id=${p.client_id}&response_type=`+
      `${response_type}&scope=${scope}`+
      `&redirect_url=${redirect_url}${provider}`
    )
    log.info(`Constructed URL ${provider_url}`)
    res.status(200).send({redirect_url: provider_url});
  } catch (error) {
    send_error({
      code: 'UNKNOWN_PROVIDER',
      message: 'Provider Unknown'
    }, res)
  }
})

// Handles the handshake for the provider and token
oauth_router.get("/handshake/:provider/:token", async (req, resp) => {
  // perform the handshake with the provider
  const provider = req.params.provider;
  const token = req.params.token;
  try {
    const handshake = await token_handshake(provider, token);
    const user = await get_user_data(provider, handshake.data);
    const parsed_user_data = summarise_user(provider, user.data);
    if (check_if_user(parsed_user_data)){
      const user_cookie = create_user_cookie(parsed_user_data);
      resp.status(200).cookie(
        'grassroots', 
        user_cookie.data
      ).send(
        {data: {cookie: true}}
      );
    } else {
      resp.status(200).send({data:{cookie: false}});
    }
  } catch (error) {
    return send_error(error, resp);
  }
})

async function token_handshake(provider, token){
  let handshake;
  try {
    handshake = config.oauth[provider].handshake;
  } catch {
    return { error: {
      code: "UNKNOWN_PROVIDER", 
      message: "Provider is not known or does not have handshake url"
    }}
  }
  const resp = await axios.get(
    handshake.url, {
      params: {
        client_id: handshake.client_id,
        client_secret: handshake.client_secret,
        code: token
      }, 
      headers: handshake.headers
    }
  )

  if (resp.data.error){
    return {
      error: {
        code: resp.data.error, 
        message: resp.data.error_description
      }
    }
  } else {
    return resp.data;
  }
}

async function get_user_data(provider, data){
  let resp;
  let token = data.access_token;
  const {referral_url, accept_type, email_url} = config.oauth[provider].get_user;
  try {
    resp = await axios.get(
      referral_url, {
        headers:{
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/'+accept_type,
        }
      }
    )
  } catch (error){
    return {error: {
      code: "USER_DATA_ERROR",
      message: "Could not get user info from provider"
    }}
  }
  const user_data = resp.data;
  if (resp.data.email == null){
    try {
      resp = await axios.get(
        email_url, 
        {headers: {'Authorization': `token ${token}`}}
      )
    } catch (error) {
      return {
        error: {
          code: "USER_EMAIL_ERROR",
          message: "Could not get user email from provider"
        }
      }
    }
    const emails = resp.data;
    const primary_email = emails.filter(e => e.primary);
    if (primary_email){
      user_data.email = primary_email.email;
    }
  }
  if (resp.status != 200){
    return {error: resp.data};
  } else {
    return resp.data;
  }
}

function summarise_user(provider, data){
  const user_data = {}
  if(provider=='github'){
    user_data.name = data.name;
    user_data.photo = data.avatar_url;
    user_data.email = data.email;
  }
  return user_data;
}