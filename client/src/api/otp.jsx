import axios from "axios";

const api = axios.create({baseURL: '/api/v1'})

export async function get_otp_code (email) {
  const resp = await api.get(
    '/auth/sign-in/otp', {
      headers: {"Authorization": email}
    }
  )
  return resp
}