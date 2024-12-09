import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../utils/fireBaseFunctions";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await logIn(email, password);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.error);
    }
  };
  return (
    <>
      <div className="form-container">
        <h1 className="form-container__title">Log Into Your Account</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__input-box">
            <label htmlFor="email" className="form__input-box__label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="form__input-box__input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form__input-box">
            <label htmlFor="password" className="form__input-box__label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="form__input-box__input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {error && <p className="form__error">{error}</p>}
          </div>
          <button className="form__button">Log In</button>
        </form>
      </div>
      <p className="text">
        Dont Have An Account ?{" "}
        <span
          onClick={() => {
            navigate("/signup");
          }}
          className="text__register"
        >
          Register
        </span>
      </p>
    </>
  );
}
