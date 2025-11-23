import axios from "axios";

const api = axios.create({baseURL: "/api/v1"})

export async function check_username(chosenUsername){
  const resp = await api.get("/auth/check-username/"+chosenUsername);
  return resp;
}

export async function create_user(username, accountType, unique_id){
  const resp = await api.post(
    "/auth/update-new-user",
    {username: username, accountType: accountType},
    {headers: {'Authorization': unique_id}}
  )
  return resp;
}