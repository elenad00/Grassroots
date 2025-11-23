import axios from "axios";

const api = axios.create({baseURL: '/api/v1'})

export async function SignUserOut () {
  const resp = await api.get('/auth/sign-out')
  return resp;
}

export async function GetFullUserInformation(){
  const resp = await api.get('/auth/get-full-user-data')
  return resp;
}