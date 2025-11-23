export function getSignInStatus (){
  if (document.cookie.includes('grassroots')){
    return getUsername();
  } else{
    return false;
  }
}
function getUsername (){
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("Username="))
    ?.split("=")[1];
}