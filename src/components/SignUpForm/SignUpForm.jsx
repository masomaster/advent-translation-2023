import { useState } from "react";
// import { signUp } from "../../utilities/users-service";
import { emailSignUp } from "../../utilities/firebase";

export default function SignUpForm({ setUser, setError }) {
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
    if (signUpForm.password !== signUpForm.confirm) {
      setError("Passwords Must Match");
      return;
    }
    const response = await emailSignUp(signUpForm.email, signUpForm.password);
    if (response === "Email already in use") {
      setError("Email already in use");
      return;
    }
    console.log("Logged in user: ", response);
    return;
    try {
      const formDataCopy = {
        ...signUpForm,
        latestDay: 1,
        preferredTranslation: "NIV",
      };
      delete formDataCopy.confirm;
      delete formDataCopy.error;
      const user = await signUp(formDataCopy);
      setUser(user);
    } catch {
      setSignUpForm({
        ...signUpForm,
      });
      setError("Sign Up Failed - Try Again");
    }
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label className="text-input">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={signUpForm.firstName}
              onChange={handleChange}
              required
              className="input-field email rounded"
            />
          </label>
          <label className="text-input">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={signUpForm.lastName}
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
              value={signUpForm.email}
              onChange={handleChange}
              required
              className="input-field email rounded"
            />
          </label>
          <label className="text-input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signUpForm.password}
              onChange={handleChange}
              required
              className="input-field email rounded"
            />
          </label>
          <div className="password-container show">
            <label className="text-input">
              <input
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={signUpForm.confirm}
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
    </div>
  );
}
