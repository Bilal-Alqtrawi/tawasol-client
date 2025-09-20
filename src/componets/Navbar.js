import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/modules/users";

const Navbar = ({ users: { isAuthenticated }, logout }) => {
  const links = (
    <ul>
      <li>
        <Link to="/login" className="login">
          Login
        </Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul>
      <li>
        <Link onClick={logout} to="/" className="logout">
          Logout
        </Link>
      </li>
    </ul>
  );
  const onClick = (e) => {
    document.querySelector(".sidebar").classList.add("active");
  };
  return (
    <nav className="navbar bg-navbar">
      <h1>
        {isAuthenticated ? (
          <button type="button" className="menu-bar" onClick={onClick}>
            <i className="fas fa-bars"></i>
          </button>
        ) : (
          <Link className="logo-navbar" to="/">
            TawaSol
          </Link>
        )}
      </h1>
      <Fragment>{isAuthenticated ? authLinks : links}</Fragment>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { logout })(Navbar);
