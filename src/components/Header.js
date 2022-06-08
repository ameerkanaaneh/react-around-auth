import { NavLink } from "react-router-dom";
import logo from "../images/Vector(1).svg";
export default function Header(props) {
  return (
    <header className="header">
      <img className="header__title" src={logo} alt="around the us" />
      {props.page ? (
        <NavLink className="header__navLink" to={`/${props.page}`}>
          {props.page === "signup" ? "Sign up" : "Log in"}
        </NavLink>
      ) : (
        <p>{props.email}</p>
      )}
    </header>
  );
}
