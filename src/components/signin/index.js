import React, { useState } from "react";
import { firebase } from "../../firebase";
import { Redirect } from "react-router-dom";
import FormField from "../UI/FormField";
import { validate } from "../UI/misc";

const SignIn = ({ history, location }) => {
  const [validation, setValidation] = useState({
    required: true,
    email: true,
    valid: false,
    message: ""
  });
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState({
    element: "input",
    value: "",
    config: {
      name: "email",
      type: "email",
      placeholder: "Enter your email address"
    }
  });

  const [password, setPassword] = useState({
    element: "input",
    value: "",
    config: {
      name: "password",
      type: "password",
      placeholder: "Enter your password"
    }
  });

  const [error, setError] = useState(false);
  const [errMsg, setMsg] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    let validData = validate(email.value, validation);
    let [valid, message] = validData;
    setValidation({ ...validation, valid, message });

    let formIsValid = validation.valid;

    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
          // history.push("/dashboard");
          setRedirect(true);
        })
        .catch(err => {
          setMsg(`${err.message}`);
          setError(true);
        });
    } else {
      setError(true);
    }
  };

  const handleEmailChange = e => {
    setEmail({ ...email, value: e.target.value });
    setError(false);
  };

  const handlePasswordChange = e => {
    setPassword({ ...password, value: e.target.value });
    setError(false);
  };

  let { from } = location.state || { from: { pathname: "/" } };

  if (redirect) return <Redirect to={from} />;

  return (
    <div className="signin_wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Please Login</h2>
        <FormField
          id="email"
          formdata={email}
          validation={validation}
          handleChange={handleEmailChange}
        />
        <FormField
          id="password"
          formdata={password}
          handleChange={handlePasswordChange}
        />
        {error && validation.message.length === 0 && (
          <div className="error_label">{errMsg}</div>
        )}

        <button type="submit">Login</button>
        <p>You must log in to view the page at {from.pathname}</p>
      </form>
    </div>
  );
};

export default SignIn;
