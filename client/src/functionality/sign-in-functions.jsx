import axios from "axios";

const api = axios.create({baseUrl: "/api/v1"});

function handle_error(setErrorLine, error){
  if (error.user_message){setErrorLine(error.user_message);};
  if (error.code){console.error(`[${error.status}] ${error.code}: ${error.message}`);};
}

export function verify_email(e, setErrorLine){
  const email = e.get('email');
  const re = /[\d\w]+@[\w]+\.(?:(?:com)|(?:gov|co|edu|ac)\.uk)/;
  if (re.test(email)){
    send_email(email, setErrorLine)
  } else {
    handle_error(
      setErrorLine, {
        error_message: "It looks like there's an error with that email address! Currently we only accept .com or .uk emails"
      }
    )
  }
}

async function send_email(email, setErrorLine){
  const {error, data} = await get_otp_code(email)
  if(error){
    error.user_message = "Error while signing in - please try again!"
    handle_error(setErrorLine, error)
  } else {
    window.location.href = "/sign-in/auth/otp"
  }
}

export async function oauth_handshake(provider, setErrorLine){
  const api_url = "/auth/sign-in/oauth/"+provider;
  const {error, data} = await api.get(api_url);
  if (error){
    error.user_message = "Error error while signing in - please try again!";
    handle_error(setErrorLine, error)
  } else {
    window.location.href = resp.data.redirect_url;
  }
}