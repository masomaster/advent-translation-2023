import { useState } from "react";
import { emailSignUp } from "../../utilities/firebase";

export default function SignUpForm({ setError, setCurrentDay }) {
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  function handleChange(evt) {
    const newFormData = {
      ...signUpForm,
      [evt.target.name]: evt.target.value,
    };
    setSignUpForm(newFormData);
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    // Prepare the form data to be sent to firebase
    const formDataCopy = {
      ...signUpForm,
      latestDay: 1,
      preferredTranslation: "NIV",
    };
    delete formDataCopy.error;

    // Send to firebase
    const response = await emailSignUp(formDataCopy);

    if (response === "Email already in use") {
      setError("Email already in use.");
      return;
    }
    if (response === "Password should be at least 6 characters.") {
      setError("Password should be at least 6 characters.");
      return;
    }
    setCurrentDay(1);
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label className="text-input">
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            placeholder="First Name"
            value={signUpForm.firstName}
            onChange={handleChange}
            required
            className="input-field email rounded"
          />
        </label>
        <label className="text-input">
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={signUpForm.email}
            onChange={handleChange}
            required
            className="input-field email rounded"
          />
        </label>
        <div className="password-container show">
          <label className="text-input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpForm.password}
              onChange={handleChange}
              required
              className="input-field"
            />
            <button type="submit" className="sign-in-btn">
              SIGN UP
            </button>
          </label>
        </div>
      </form>
    </div>
  );
}
