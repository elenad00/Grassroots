import { check_username, create_user } from "../api/sign-up";
import { PageContent, PageElement } from "../components/multiuse-elements";
import styles from "../css/authentication.module.css";
import { useState } from "react";

function handle_error(error, setErrorLine){
  if (error.user_message){
    setErrorLine(error.user_message);
  };
  if (error.code){
    console.error(`[${error.status}] ${error.code}: ${error.message}`);
  }
}

async function check_user_input(e, setErrorLine){
  e.preventDefault()
  const username = (e.target.elements.username.value).toString().toLowerCase();
  const accountType = (e.target.elements.accountType.value).toString().toLowerCase();
  // Check the username against the username regex
  const re = /[0-9a-z]{5,12}/;
  if(!re.test(username)){
    handle_error({user_message:"Usernames can only contain letters and numbers and must be between 5 and 12 characters long"}, setErrorLine)
  } else if (!accountType){
    handle_error({user_message:"Please select your account type!"}, setErrorLine)
  } else {
    const username_free = await check_username(username, accountType, setErrorLine);
    if (username_free){
      create_user(username, accountType);
    }
  }
}

async function check_username(username, setErrorLine){
  const {error, data} = await check_username(username);
  if(error){
    handle_error({user_message: "Our bad - looks like we can't validate that username right now..."}, setErrorLine)
    return false;
  } else if (!data.usernameFree){
    handle_error({user_message: "That username's taken; why don't you do try another one"}, setErrorLine);
    return false;
  } else {
    return true;
  }
}

async function create_user(username, accountType){
  const {error, data} = await create_user(username, accountType);
  if(error){
    error.user_error = "Huh, looks like we can't create your account right now - try again later!";
    handle_error(error, setErrorLine)
  } else{
    window.location.href = "/user/profile";
  }
}

export default function CreateAccount(){
  const [errorLine, setErrorLine] = useState();
  return(
    <PageContent page="sign-up">
      <PageElement>
        <form onSubmit={check_user_input(e, setErrorLine)} className={styles.createUser}>
          <div className={styles.createUserElement}>
            <h3>Username</h3>
            <input type="text" name="username"/>
            </div>
          <div className={styles.createUserElement}>
            <h3> I am a...</h3>
            <select name="accountType" className={styles.accountType}>
              {['Fan','Artist','Venue'].map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
          </div>
          <button type="submit">Sign Up!</button>
          <p>{errorLine}</p>
        </form>
      </PageElement>
    </PageContent>
  )
}