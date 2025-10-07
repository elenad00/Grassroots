// Core Functions
function SetSessionStorageItem(key, value){
  window.sessionStorage.setItem(key, value);
}

function GetSessionStorageItem(key){
  return window.sessionStorage.getItem(key)
}

function DeleteSessionStorageItem(key){
  window.sessionStorage.removeItem(key);
}

// Touch JWT - this is used to check to see if the user is signed in,
// regardless of if they have a username. there is a strange Descope bug whereby
// some users don't have a username - thus this is used for header rendering
export function TouchJWT(){
  if(GetSessionStorageItem('jwt_refreshToken')){
    return true;
  } else{
    return false;
  }
}

// Getters
export function GetUsername(){
  return GetSessionStorageItem('username')
}
export function GetSessionId(){
  return GetSessionStorageItem('sessionId');
}
export function GetRefreshJWT(){
  return GetSessionStorageItem('jwt_refreshToken');
}
export function GetUserEmail(){
  return GetSessionStorageItem('email')
}

// Setters
export function SetSessionId(){
  const sessionId = crypto.randomUUID();
  SetSessionStorageItem('sessionId', sessionId)
}

export function SetJWTs(jwts){
  SetSessionStorageItem("jwt_sessionToken", jwts.session)
  SetSessionStorageItem("jwt_refreshToken", jwts.refresh)
}

export function SetUsername(username){
  SetSessionStorageItem("username", username)
}

export function SetUserEmail(email){
  SetSessionStorageItem('email', email)
}

// Delete
export function DeleteUserDetails(){
  DeleteSessionStorageItem('jwt_refreshToken');
  DeleteSessionStorageItem('jwt_sessionToken');
  DeleteSessionStorageItem('username')
}
export function DeleteUserEmail(){
  DeleteSessionStorageItem('email')
}


