import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signup } from "../../services/authService";
import { UserContext } from "../../context/UserContext";
import "../AuthForm/AuthForm.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const { username, password, passwordConf } = formData;

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the browser from refreshing on form submit
    console.log(formData);
    try {
      const user = await signup(formData);
      console.log(user);
      setUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Sign Up</h1>
        <p className="auth-message" aria-live="polite">
          {message}
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="username">Username:</label>
            <input
              className="auth-input"
              type="text"
              id="name"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-field">
            <label htmlFor="password">Password:</label>
            <input
              className="auth-input"
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-field">
            <label htmlFor="confirm">Confirm Password:</label>
            <input
              className="auth-input"
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-actions">
            <button
              className="auth-button auth-button-primary"
              disabled={isFormInvalid()}
            >
              Sign Up
            </button>
            <button
              className="auth-button auth-button-secondary"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignUpForm;
