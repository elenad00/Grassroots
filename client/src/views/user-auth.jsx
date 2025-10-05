import { AuthProvider, Descope, useDescope, useSession} from "@descope/react-sdk";
import { config } from "../functionality/config";
import { getUsername } from "../functionality/authentication";
import { NavButton, PageContent, PageElement } from "../components/multiuse-elements";
import { useEffect } from "react";
export function SignIn () {
  const username = getUsername();
  
  const ExistingUser = () => {
    return (
      <>
        <h3>Looks like you're already logged in {username}!</h3>
        <p>Click below to sign in with a different account.</p>
        <NavButton 
          content={{
            title: "Use A Different Account", 
            link: "/sign-out"
          }}/>
      </>
    )
  }
  const DescopeHolder = () => {
    return (
      <AuthProvider projectId={config.AUTH.PROJECT_ID}>
        <Descope
          flowId="sign-user-up"
          theme="light"
          onSuccess={(e) => {
            console.log('signed in')
            console.log(e)
            window.location.href = '/user'
          }}
          onError={(err) => {
            console.log("Error!", err)
          }}
        />
      </AuthProvider>
    )
  }
  return (
    <PageContent page="sign-in">
      <PageElement>
        {username ? <ExistingUser /> : <DescopeHolder />}
      </PageElement>
    </PageContent>
  );
};

export function SignOut(){
  const { logout } = useDescope();
  const session = useSession();

  useEffect(() => {
    console.log(session)
    if(session.sessionToken){
      const logOutUser = logout(session.sessionToken)
      console.log(logOutUser);
    }
  }, [session])
  
  // window.location.href="/"
}