function SetUUID(){
  const sessionUUID = crypto.randomUUID();
  window.sessionStorage.setItem('sessionId', sessionUUID);
  return sessionUUID;
}

function GetUUID(){
  let sessionUUID = window.sessionStorage.getItem('sessionId')
  if (!sessionUUID){
    sessionUUID = SetUUID()
  } 
  return sessionUUID;
}

export default GetUUID;