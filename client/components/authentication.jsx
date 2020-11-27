import React, { useState } from 'react';
import SignUp from './signUp';
import SignIn from './signIn';

const Authentication = props => {
  const [view, setAccountView] = useState('welcome');

  const welcomeRender = () => {
    if (view === 'welcome') {
      return (<div className="login-gradient d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-white">Teacher Portal</h1>
        <div>
          <button className="btn btn-outline-light m-2 btn-lg" onClick={() => setAccountView('signUp')}>Sign Up</button>
          <button className="btn btn-outline-light m-2 btn-lg" onClick={() => setAccountView('signIn')}>Log In</button>
        </div>
        <button className="btn btn-outline-light m-2 btn-lg" onClick={() => setAccountView('guestMode')}>Guest</button>
      </div>
      );
    } else if (view === 'signUp') {
      return <SignUp userSignedIn={props.userSignedIn} goBack={() => setAccountView('welcome')}/>;
    } else if (view === 'signIn') {
      return <SignIn userSignedIn={props.userSignedIn} goBack={() => setAccountView('welcome')} />;
    } else {
      props.userSignedIn(true);
    }
  };

  return (
    <>
      {welcomeRender()}
    </>
  );
};

export default Authentication;
