import axios from "axios";

const api = axios.create({baseURL: '/api/v1'})

const ExchangeAuthCode = async (code) => {
  const request = await api.post("/auth", {
    authCode: code
  })
  return request
}

export {ExchangeAuthCode};