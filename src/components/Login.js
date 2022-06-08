import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

export default function Login(props) {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    password: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!data.password || !data.email) {
      return;
    }
    auth
      .authorize(data.email, data.password)
      .then((data) => {
        if (data.token) {
          setData({ ...data, email: "", password: "" });
        }
      })
      .then(() => {
        props.handleLogin(e);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <section className="login">
      <h2 className="login__header">Log in</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          name="email"
          onChange={handleChange}
          value={data.email}
          type="email"
          placeholder="Email"
        ></input>
        <input
          className="login__input"
          name="password"
          onChange={handleChange}
          value={data.password}
          type="password"
          placeholder="Password"
        ></input>
        <button className="login__submit" type="submit">
          Log in
        </button>
      </form>
      <Link className="login__link" to="/signup">
        Not a member yet? Sign up here!
      </Link>
    </section>
  );
}
