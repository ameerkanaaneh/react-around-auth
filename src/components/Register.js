import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

export default function Register(props) {
  const navigate = useNavigate();
  const { data, setData } = props;
  const handleSubmit = function (e) {
    e.preventDefault();
    auth
      .register(data.email, data.password)
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = function (e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <section className="register">
      <h2 className="register__header">Sign up</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input"
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        ></input>
        <input
          className="register__input"
          name="password"
          placeholder="Password"
          value={data.password}
          type="password"
          onChange={handleChange}
        ></input>
        <button className="register__submit" type="submit">
          Sign up
        </button>
      </form>
      <Link className="register__link" to="/signin">
        Already a member? Log in here!
      </Link>
    </section>
  );
}
