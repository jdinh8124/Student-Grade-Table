import React from 'react';

const SignIn = props => {
  const [userName, setUserName] = React.useState('');
  const [userPassword, setPassword] = React.useState('');
  const [wrongUsername, setWrongUsername] = React.useState(false);
  const [emptyFields, setEmptyFields] = React.useState(false);

  const isUserNameValid = () => {
    if (wrongUsername) {
      return (
        <div className="text-white invalid-feedback mb-3 pt-0 showError">
          Your Username or Password Was Incorrect
        </div>
      );
    }
  };

  const isUserFieldsEmpty = () => {
    if (emptyFields) {
      return (
        <div className="text-white invalid-feedback showError mb-3 pt-0 warningDiv">
          You Have Empty Fields
        </div>
      );
    }
  };

  const checkAccount = event => {
    event.preventDefault();
    if (userPassword === '' || userName === '') {
      setEmptyFields(true);
      return;
    } else {
      setEmptyFields(false);
    }

    const newObj = { userName, userPassword };
    event.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObj)
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          return response.json();
        } else {
          setWrongUsername(true);
        }
      })
      .then(res => {
        if (res) {
          props.userSignedIn(true);
        }

      });
  };

  return (
    <div className="login-gradient d-flex flex-column  align-items-center h-100vh justify-content-center">
      <h1 className="text-white">Sign In</h1>
      <form className="d-flex align-items-center flex-column" >
        <div className="input-group flex-nowrap mb-3 signup-input">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping"><i className="fas fa-user"></i></span>
          </div>
          <input onChange={inputChangeEvent => setUserName(inputChangeEvent.target.value)} className="form-control" placeholder="Username" />
        </div>
        <div className="input-group flex-nowrap mb-2 signup-input">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping"><i className="fas fa-lock"></i></span>
          </div>
          <input type="password" name="password" autoComplete="on" onChange={inputChangeEvent => setPassword(inputChangeEvent.target.value)} className="form-control" placeholder="Password" />
        </div>
        {isUserNameValid()}
        {isUserFieldsEmpty()}
        <div>
          <button onClick={props.goBack} className="btn btn-secondary mr-3">Go Back</button>
          <button onClick={checkAccount} className="btn btn-success">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
