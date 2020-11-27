import React from 'react';

const SignUp = props => {
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [userPassword, setPassword] = React.useState('');
  const [confirmationPassword, setconfirmationPassword] = React.useState('');
  const [duplicateUsername, setDuplicateUsername] = React.useState(false);
  const [passwordsDoNotMatch, setNotMatchingPasswords] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [emptyFields, setEmptyFields] = React.useState(false);

  const createAccount = submitEvent => {
    submitEvent.preventDefault();
    if (userPassword === '' || confirmationPassword === '' || userName === '' || email === '') {
      setEmptyFields(true);
      return;
    } else {
      setEmptyFields(false);
    }
    if (userPassword !== confirmationPassword) {
      setNotMatchingPasswords(true);
      return;
    } else {
      setNotMatchingPasswords(false);
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    const newObj = { userName, email, userPassword, confirmationPassword };
    fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObj)
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        if (myJson === 'Username exists' || myJson.error === 'an unexpected error occurred') {
          setDuplicateUsername(true);
        } else {
          props.userSignedIn(true);
        }
      });
  };

  const isUserFieldsEmpty = () => {
    if (emptyFields) {
      return (
        <div className="text-white invalid-feedback showError mb-3 warningDiv">
            You Have Empty Fields
        </div>
      );
    }
  };

  const isUserNameValid = () => {
    if (duplicateUsername) {
      return (
        <div className="text-white invalid-feedback showError mb-3 warningDiv">
              Your Username You Selected Was Taken
        </div>
      );
    }
  };

  const passWordsDoNotMatch = () => {
    if (passwordsDoNotMatch) {
      return (
        <div className="text-white invalid-feedback showError mb-3 warningDiv">
              Your Passwords Do Not Match
        </div>
      );
    }
  };

  const isThereAnEmailError = () => {
    if (emailError) {
      return (
        <div className="text-white invalid-feedback showError mb-3 warningDiv">
              Your Email Was Not Valid
        </div>
      );
    }
  };

  return (
    <div className="login-gradient d-flex flex-column  align-items-center h-100vh justify-content-center ">
      <h1 className="text-white">Create Account</h1>
      <form className="d-flex align-items-center flex-column">
        <div className="input-group flex-nowrap mb-3 signup-input">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping"><i className="fas fa-user"></i></span>
          </div>
          <input onChange={inputChangeEvent => setUserName(inputChangeEvent.target.value)} className="form-control" placeholder="Username" />
        </div>

        {isUserNameValid()}
        <div className="input-group flex-nowrap mb-3 signup-input">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping"><i className="fas fa-envelope"></i></span>
          </div>
          <input onChange={inputChangeEvent => setEmail(inputChangeEvent.target.value)} className="form-control" placeholder="Email" />
        </div>
        {isThereAnEmailError()}
        <div className="input-group flex-nowrap mb-3 signup-input">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping"><i className="fas fa-lock"></i></span>
          </div>
          <input type="password" name="password" autoComplete="on" onChange={inputChangeEvent => setPassword(inputChangeEvent.target.value)} className="form-control" placeholder="Password" />
        </div>

        <div className="input-group flex-nowrap mb-3 signup-input">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping"><i className="fas fa-lock"></i></span>
          </div>
          <input type="password" name="password" autoComplete="on" onChange={inputChangeEvent => setconfirmationPassword(inputChangeEvent.target.value)} className="form-control" placeholder="Confirm Password" />
        </div>
        {passWordsDoNotMatch()}
        {isUserFieldsEmpty()}
        <div>
          <button onClick={props.goBack} className="btn btn-secondary mr-3">Go Back</button>
          <button onClick={createAccount} className="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
