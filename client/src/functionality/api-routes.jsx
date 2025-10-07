import { apiGet, apiPost } from "./api";
import { GetRefreshJWT, GetUserEmail } from "../functionality/session-storage"

// Sign In
// OAuth
// Initialise OAuth
export async function InitialiseOauth (provider) {
  const resp = await apiGet(
    '/auth/signin-oauth', 
    `provider,${provider}`
  )
  return resp
}
// Perform the OAuth token handshake using the token returned from the provider
export async function ExchangeAuthCode (token) {
  const resp = await apiGet(
    "/auth/signin-oauth-exchange", 
    `token,${token}`
  )
  return resp;
}
// OTP
// Initialise OTP
export async function InitialiseOTPAuth (email) {
  const resp = await apiGet(
    '/auth/signin-otp', 
    `loginId,${email}`
  )
  return resp
}
// Perform the OTP code verification
export async function ExchangeOTP (code){
  const loginId = GetUserEmail();
  const resp = await apiGet(
    "/auth/signin-otp-exchange", 
    `code,${code},loginId,${loginId}`
  )
  return resp;
}

// Sign Out
// Sign the user out using their JWT
export async function SignUserOut () {
  const refreshToken = GetRefreshJWT()
  const resp = await apiGet(
    '/auth/sign-out',
    `refreshToken,${refreshToken}`
  )
  return resp;
}

// User Information
// Get the user information we care about when loading and changing the user settings and profile
export async function GetFullUserInformation(){
  const refreshToken = GetRefreshJWT()
  const resp = await apiGet(
    '/auth/get-full-user-data',
    `refreshToken,${refreshToken}`
  )
  return resp;
}

