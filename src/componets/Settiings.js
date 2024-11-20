import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteAccount } from "../redux/modules/profiles";

const Settings = ({ deleteAccount }) => {
  return (
    <div className="home">
      <div className="post-card center">
        <div style={{ marginBottom: 15 }}>
          <p>Upload your Profile information</p>
        </div>
        <div style={{ marginBottom: 15 }}>
          <Link className="btn btn-primary" to="/edit-profile">
            Edit Account
          </Link>
        </div>
      </div>
      <div className="post-card center">
        <div style={{ marginBottom: 15 }}>
          <p>
            This will completely delete your account and remove your data from
            TawaSol.
          </p>
        </div>
        <div style={{ marginBottom: 15 }}>
          <button className="btn btn-danger" onClick={() => deleteAccount()}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { deleteAccount })(Settings);
