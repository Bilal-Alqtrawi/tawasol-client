import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../redux/modules/profiles";

const AddEducation = ({ addEducation, history }) => {
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
  });

  const { school, degree, fieldofstudy, from, to, current } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleFocus = (ref) => {
    if (ref.current && ref.current.showPicker) {
      ref.current.showPicker();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <div className="form-page-container add-eduction-form">
      <div className="form-header">
        <h1 className="form-title">Add Education</h1>
        <small> * = required field</small>
      </div>

      <form className="modern-form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School"
            name="school"
            value={school}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={onChange}
          />
        </div>
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fromDate">From Date</label>
              <input
                ref={fromRef}
                type="date"
                id="fromDate"
                name="from"
                value={from}
                onChange={onChange}
                onFocus={() => handleFocus(fromRef)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="toDate">To Date</label>
              <input
                ref={toRef}
                id="toDate"
                type="date"
                name="to"
                value={to}
                onChange={onChange}
                disabled={current}
                onFocus={() => handleFocus(toRef)}
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
                <span> Current School</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <input type="submit" className="btn btn-primary" value="Send" />
          <Link to="/home" className="btn btn-light">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
