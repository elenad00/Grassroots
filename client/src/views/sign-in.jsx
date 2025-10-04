import { AuthProvider, Descope } from "@descope/react-sdk";
import { config } from "../functionality/Config";
import { getUsername } from "../functionality/authentication";
import { NavButton, PageContent, PageElement } from "../components/multiuse-elements";

export function SignIn () {
  const username = getUsername();
  
  const ExistingUser = () => {
    return (
      <>
        <h3>Looks like you're already logged in {username}!</h3>
        <p>Click below to sign in with a different account.</p>
        <NavButton content={{title: "Use A Different Account", link: "/sign-out"}}/>
      </>
    )
  }
  const DescopeHolder = () => {
    return (
      <AuthProvider projectId={config.AUTH.PROJECT_ID}>
        <Descope flowId="sign-user-up" theme="light" />
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