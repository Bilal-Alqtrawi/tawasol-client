import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../redux/modules/profiles";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
  });

  const { title, company, location, from, to, current } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <div className="form-page-container add-eduction-form">
      <div className="form-header">
        <h1 className="form-title">Add Experience</h1>
        <small> * = required field</small>
      </div>
      <form className="modern-form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <h3>From Date</h3>
              <input type="date" name="from" value={from} onChange={onChange} />
            </div>
            <div className="form-group">
              <h3>To Date</h3>
              <input
                type="date"
                name="to"
                value={to}
                onChange={onChange}
                disabled={current}
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={() =>
                    setFormData({ ...formData, current: !current })
                  }
                  style={{ marginRight: 5 }}
                />
                Current Job
              </label>
            </div>
          </div>
        </div>
        <input type="submit" className="btn btn-primary" />
        <Link to="/home" className="btn btn-light">
          Go Back
        </Link>
      </form>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
