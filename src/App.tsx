import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../amplify_outputs.json";
import { useState } from 'react';

Amplify.configure(outputs);

export default function App() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const [showAuthStatus, setShowAuthStatus] = useState(false);

  const toggleAuthStatus = () => {
    setShowAuthStatus(!showAuthStatus);
    console.log('authStatus:', authStatus);
  };

  return (
    <div>
      <p>Authentication Status: {authStatus}</p>
      <button onClick={toggleAuthStatus}>Toggle Auth Status</button>
      {showAuthStatus && <p>authStatus: {authStatus}</p>}
      {authStatus === 'configuring' && 'Loading...'}
      {authStatus !== 'authenticated' ? (
        <Authenticator />
      ) : (
        <Home authStatus={authStatus} />
      )}
    </div>
  );
}

const Home = ({ authStatus }) => {
  const { signOut } = useAuthenticator(context => [context.user, context.signOut]);

  return (
    <div>
      <h1>Welcome to the Home page!</h1>
      <p>authStatus: {authStatus}</p>
      {/* Add your home page content here */}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};