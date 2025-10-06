import apiPost from "./api";

// Sign In
// Initialise OAuth
export async function InitialiseOauth (provider) {
  const resp = await apiPost(
    '/auth/signin-oauth', 
    {provider: provider}
  )
  return resp
}

// Perform the OAuth token handshake using the token returned from the provider
export async function ExchangeAuthCode (token) {
  const resp = await apiPost(
    "/auth/signin-token-exchange", 
    {token: token}
  )
  return resp;
}

// Sign Out
// Sign the user out using their JWT
export async function SignOut () {
  const refreshToken = window.sessionStorage.getItem("jtw_refreshToken")
  const resp = await apiPost(
    '/auth/sign-out',
    {refreshToken: refreshToken}
  )
  return resp;
}

// User Information
// Get the user information we care about when loading and changing the user settings and profile
export async function GetFullUserInformation(){
  const refreshToken = window.sessionStorage.getItem("jtw_refreshToken")
  const resp = await apiPost(
    '/auth/get-full-user-data',
    {refreshToken: refreshToken}
  )
  return resp;
}

