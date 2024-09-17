import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

export default function App() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  return (
    <>
      {authStatus === 'configuring' && 'Loading...'}
      {authStatus !== 'authenticated' ? (
        <LoginScreen />
      ) : (
        <Home />
      )}
    </>
  );
}

const LoginScreen = () => {
  return (
    <div>
      <div>Authentication required</div>
      <Authenticator>
        {({ signIn }) => <button onClick={signIn}>Login</button>}
      </Authenticator>
    </div>
  );
};

const Home = () => {
  const { signOut } = useAuthenticator(context => [context.user, context.signOut]);

  return (
    <div>
      <h1>Welcome to the Home page!</h1>
      {/* Add your home page content here */}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};