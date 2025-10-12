import axios from "axios";
import { GetRefreshJWT, GetSessionId, GetUserEmail } from "./session-storage";
import "./types"

const api = axios.create({baseURL: '/api/v1'})

/** Get the headers for the API call; sets the content type, sessionId and any relevant metadata
 * @param {object} metadata The metadata to be handled in the heading
 * @returns {object} The completed header object */
function getHeaders(metadata){
  const sessionId = GetSessionId();
  return {
    'Content-Type': "application/json",
    'Authorization': `${sessionId}`,
    'Metadata':`${metadata}`
  }
}
/** Handles an error if returned by the API request
 * @param {object} error The metadata to be handled in the heading
 * @returns {APIError} The neatened error message */
function handleError(error){
  return (
    error.response.data.message
    ? error.response.data
    : {
        status: error.status,
        code: error.code,
        message: error.message
      }
  )
}

/** Handles the API Post request
 * @param {string} location The API address to post to
 * @param {object} metadata The metadata to add to the request headers and send with the request
 * @returns {APIResponse} The response from the API */
async function apiPost(location, metadata){
  try{
    const response = await api.post(location, metadata, {headers: getHeaders(metadata)})
    return {error: false, data: response.data};
  } catch (error){
    return {error: handleError(error), data: false}
  }
}

/** Handles the API Get request
 * @param {string} location The API address to post to
 * @param {object} metadata The metadata to add to the request headers
 * @returns {APIResponse} The response from the API */
async function apiGet(location, metadata){
  try{
    const response = await api.get(location, {headers: getHeaders(metadata)})
    return {error: false, data: response.data};
  } catch (error){
    return {error: handleError(error), data: false}
  }
}
/** Initialise the OAuth Sign In to the provider selected by the user
 * @param {string} provider The provider the user has chosen to use for OAuth
 * @returns {APIResponse} The API's response */
export async function InitialiseOauth (provider) {
  const resp = apiGet( '/auth/signin-oauth', `provider,${ provider }` )
  return resp
}
/** Perform the OAuth token handshake using the token returned from the provider
 * @param {string} token The token returned from the OAuth Provider
 * @returns {APIResponse} The API's response */
export async function ExchangeAuthCode (token) {
  const resp = apiGet( "/auth/signin-oauth-exchange", `token,${ token }` )
  return resp;
}
/** Initialise the OTP Authentication
 * @param {string} email The email entered by the user
 * @returns {APIResponse} The API's response */
export async function InitialiseOTPAuth (email) {
  const resp = apiGet( '/auth/signin-otp', `loginId,${ email }` )
  return resp
}
/** Perform the OTP code verification
 * @param {string} code The OTP code entered by the user
 * @returns {APIResponse} The API's response */
export async function ExchangeOTP (code){
  const loginId = GetUserEmail();
  const resp = apiGet( "/auth/signin-otp-exchange", `code,${ code },loginId,${ loginId }` )
  return resp;
}
/** Sign the user out using their JWT
 * @returns {APIResponse} The API's response */
export async function SignUserOut () {
  const refreshToken = GetRefreshJWT()
  const resp = apiGet(
    '/auth/sign-out',
    `refreshToken,${ refreshToken }`
  )
  return resp;
}
/** Get the user information we care about when loading and changing the user settings and profile
 * @returns {APIResponse} The API's response */
export async function GetFullUserInformation(){
  const refreshToken = GetRefreshJWT()
  const resp = apiGet(
    '/auth/get-full-user-data',
    `refreshToken,${ refreshToken }`
  )
  return resp;
}