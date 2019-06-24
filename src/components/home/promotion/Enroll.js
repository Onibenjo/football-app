import React, { useState } from "react";
import { Fade } from "react-reveal";
import FormField from "../../UI/FormField";
import { validate } from "../../UI/misc";
import { firebasePromotions } from "../../../firebase";
const Enroll = () => {
  const [validation, setValidation] = useState({
    required: true,
    email: true,
    valid: false,
    message: ""
  });
  const [email, setEmail] = useState({
    element: "input",
    value: "",
    config: {
      name: "email",
      type: "email",
      placeholder: "Enter your email address"
    }
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");

  const resetForm = type => {
    type
      ? setSuccess("Congratulations!!!")
      : setSuccess("This email has already been used");
    setEmail({ ...email, value: "" });
    setValidation({ valid: false, message: "" });
    setError(false);
    successTimeout();
  };

  const successTimeout = () => {
    setTimeout(() => setSuccess(""), 5000);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let formIsValid = validation.valid;

    if (formIsValid) {
      firebasePromotions
        .orderByChild("email")
        .equalTo(email.value)
        .once("value")
        .then(res => {
          if (res.val() === null) {
            firebasePromotions.push({ email: email.value });
            resetForm(true);
          } else {
            resetForm(false);
          }
        });
    } else {
      setError(true);
    }
  };

  const handleChange = e => {
    setEmail({ ...email, value: e.target.value });
    setError(false);

    let validData = validate(e.target.value, validation);
    let [valid, message] = validData;

    setValidation({ ...validation, valid, message });
  };

  return (
    <Fade>
      <div>
        <div className="enroll_wrapper">
          <form onSubmit={handleSubmit}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField
                id="email"
                formdata={email}
                validation={validation}
                handleChange={handleChange}
              />
              {error && validation.message.length === 0 && (
                <div className="error_label">
                  Something went wrong. Try again
                </div>
              )}
              <div className="success_label">{success}</div>
              <button type="submit">Enroll</button>
              <div className="enroll_discl">
                The teams news, updates and events would be sent weekly to keep
                you up to date. No spamming allowed.
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fade>
  );
};

export default Enroll;
