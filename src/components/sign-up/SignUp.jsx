import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/fireBaseFunctions";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(
      inputs.username,
      inputs.email,
      inputs.password
    );
    if (res.success) {
      navigate("/");
    } else {
      setError(res.error);
    }
  };
  return (
    <>
      <div className="form-container">
        <h1 className="form-container__title">Create A New Account</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__input-box">
            <label htmlFor="username" className="form__input-box__label">
              Username:
            </label>
            <input
              type="text"
              name="username"
              className="form__input-box__input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form__input-box">
            <label htmlFor="email" className="form__input-box__label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="form__input-box__input"
            />
          </div>
          <div className="form__input-box">
            <label htmlFor="password" className="form__input-box__label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="form__input-box__input"
            />
            {error && <p className="form__error">{error}</p>}
          </div>
          <button type="submit" className="form__button">
            Sign Up
          </button>
        </form>
      </div>
      <p className="text">
        Already Have An Account ?{" "}
        <span
          onClick={() => {
            navigate("/signin");
          }}
          className="text__register"
        >
          Log In
        </span>
      </p>
    </>
  );
}
