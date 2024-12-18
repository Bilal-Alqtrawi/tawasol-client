import React from "react";
import { Link } from "react-router-dom";
import LandingTitle from "./LandingTitle";

const Landing = () => {
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="logo">Tawasol</h1>
          <LandingTitle />
          <div className="names">
            <Link to="/register" className="btn btn-primary display-block">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light display-block">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
