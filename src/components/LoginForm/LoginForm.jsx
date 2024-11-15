import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import { emailSignIn } from "../../utilities/firebase";

export default function LoginForm({
  setUser,
  emailEntered,
  setEmailEntered,
  setError,
}) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    setEmailEntered(evt.target.value.trim().length > 0);
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const response = await emailSignIn(credentials.email, credentials.password);
    if (response === "Email and password don't match an existing account. Try again.") {
      setError("Email and password don't match an existing account. Try again.");
      return;
    }
    return;
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch (err) {
      setError("Login Failed: Check your email address and password.");
    }
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label className="text-input">
          <input
            type="text"
            name="email"
            placeholder="Enter your email address"
            className={`input-field email ${emailEntered ? "rounded" : ""}`}
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <button
            className={`sign-in-btn ${emailEntered ? "fade-out" : "fade-in"}`}
            tabIndex="-1"
          >
            Sign In
          </button>
        </label>
        <div className={`password-container ${emailEntered ? "show" : ""}`}>
          <label className="text-input">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input-field"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="sign-in-btn">
              Sign In
            </button>
          </label>
        </div>
      </form>
    </div>
  );
}
