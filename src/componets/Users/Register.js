import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // what props expected
import { register } from "../../redux/modules/users";
import { showAlertMessage } from "../../redux/modules/alerts";
import Navbar from "../Navbar";

const Register = ({ isAuthenticated, register, showAlertMessage }) => {
  // internal State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      showAlertMessage("Passwords do not match", "error");
    } else {
      /*  name,email,password => formData */
      register({
        name,
        email,
        password,
      });
    }
  };
  const onChange = (e) => {
    return setFormData({
      ...formData,
      // Dynamic Way
      [e.target.name]: e.target.value,
    });
  };
  if (isAuthenticated) {
    // window.location.href = `/home`
    return <Navigate to="/home" />;
  }
  return (
    <>
      <Navbar />
      <div className="main register">
        <p className="form-title" align="center">
          Sign Up
        </p>
        <form className="form1" onSubmit={onSubmit}>
          <input
            className="input-text"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            align="center"
            onChange={onChange}
          />
          <input
            className="input-text"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            align="center"
            onChange={onChange}
          />
          <input
            className="input-text"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            align="center"
            onChange={onChange}
          />
          <input
            className="input-text"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            align="center"
            onChange={onChange}
          />
          <input
            className="btn btn-primary"
            type="submit"
            align="center"
            value="Register"
          />
          <p className="forgot" align="center">
            Already hava an account?
            <Link to="/login"> Sign In</Link>
          </p>
        </form>
      </div>
    </>
  );
};

// What props expected
Register.propTypes = {
  register: PropTypes.func.isRequired, // validation
  showAlertMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
  };
};
export default connect(mapStateToProps, { showAlertMessage, register })(
  Register
);
