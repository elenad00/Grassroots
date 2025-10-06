import axios from "axios";
import GetUUID from "./uuid-setter-getter"

const api = axios.create({baseURL: '/api/v1'})

async function apiPost(location, metadata){
  // get the user's session id
  const userUUID = GetUUID();
  // set the headers to ensure that the client can receive json and set the session id
  const headers = {
    'Content-Type': "application/json",
    'Authorization': `${userUUID}` 
  }
  // initiate the post request
  try{
    const response = await api.post(location, metadata, {headers: headers})
    return {error: false, data: response.data};
  } catch (error){
    return {error: error.response.data, data: false}
  }
}

export default apiPost