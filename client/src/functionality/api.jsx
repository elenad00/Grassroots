import axios from "axios";
import { GetSessionId } from "./session-storage"

const api = axios.create({baseURL: '/api/v1'})

function getHeaders(metadata){
  const sessionId = GetSessionId();
  let headers = {
    'Content-Type': "application/json",
    'Authorization': `${sessionId}` ,
  }
  if(metadata){
    headers.Metadata = metadata
  }
  return headers;
}

function handleError(error){
  let handledError;
  if(error.response.data.message){
    handledError = error.response.data
  } else{
    handledError = {
      status: error.status,
      code: error.code,
      message: error.message
    }
  }
  return handledError;
}

export async function apiPost(location, metadata){
  // initiate the post request
  const headers = getHeaders(metadata)
  try{
    const response = await api.post(location, metadata, {headers: headers})
    return {error: false, data: response.data};
  } catch (error){
    return {error: handleError(error), data: false}
  }
}

export async function apiGet(location, metadata){
  // initiate the post request
  const headers = getHeaders(metadata)
  try{
    const response = await api.get(location, {headers: headers})
    return {error: false, data: response.data};
  } catch (error){
    return {error: handleError(error), data: false}
  }
}