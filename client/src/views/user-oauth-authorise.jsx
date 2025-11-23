import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const api = axios.create({baseUrl: "/api/v1"});

export default async function handle_oauth_token(){
  const { provider } = useParams()
  const token = searchParams.get("code");
  const resp = await api.get("/auth/sign-in/oauth/handshake/"+provider+"/"+token);

  useEffect(()=> {
    if(!resp){return}
    if(resp.error){
      console.log(`[${error.status}] ${error.code}: ${error.message}`);
      window.location.href = "/sign-in?error=Cant+Complete+OAuth";
    } else {
      if (resp.data.cookie){
        window.location.href = "/user/profile";
      } else {
        window.location.href = "/sign-up";
      }
    }
  }, [resp])
}
