import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
} from "../../redux/modules/profiles";

const initialState = {
  company: "",
  website: "",
  location: "",
  country: "",
  status: "",
  skills: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
  github: "",
};
const ProfileForm = ({
  profiles: { profile, loading },
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!profile) {
      getCurrentProfile();
    }
    if (profile && !loading) {
      const profileData = { ...initialState };
      // TODO
      // Populate fields with existing profile data
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }

      // Map social links if they exist
      if (profile.social) {
        for (const key in profile.social) {
          if (key in profileData) profileData[key] = profile.social[key];
        }
      }

      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);
  const {
    company,
    website,
    location,
    country,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    github,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!status) {
      alert("Please select your professional status.");
      return "";
    }
    createProfile(formData, history, profile ? true : false);
  };

  const onFileChange = (e) => {
    const data = new FormData(); // when upload file to server
    data.append("file", e.target.files[0]);
    uploadProfileImage(data);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="main" style={{ width: 600, textAlign: "center" }}>
      <p className="form-title">Edit Profile</p>
      <form className="form1" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>* Select Profesional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input type="file" onChange={onFileChange} />
        </div>
        <div className="form-group">
          <input
            className="input-text"
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="input-text"
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="input-text"
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="input-text"
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className="input-text"
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="input-text"
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-light social-btn"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Social Networks
          </button>
          {displaySocialInputs ? (
            <Fragment>
              <div>
                <i className="fab fa-twitter fa-2x" />
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={onChange}
                />
              </div>
              <div>
                <i className="fab fa-facebook fa-2x" />
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={onChange}
                />
              </div>
              <div>
                <i className="fab fa-youtube fa-2x" />
                <input
                  type="text"
                  placeholder="Youtube URL"
                  name="youtube"
                  value={youtube}
                  onChange={onChange}
                />
              </div>
              <div>
                <i className="fab fa-linkedin fa-2x" />
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={onChange}
                />
              </div>
              <div>
                <i className="fab fa-instagram fa-2x" />
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={onChange}
                />
              </div>
              <div>
                <i className="fab fa-github fa-2x" />
                <input
                  type="text"
                  placeholder="Github URL"
                  name="github"
                  value={github}
                  onChange={onChange}
                />
              </div>
            </Fragment>
          ) : (
            <Fragment />
          )}
          <span>Optional</span>
        </div>

        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Submit" />
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              navigate("/home");
              window.location.reload(); // Force refresh on navigation
            }}
          >
            Go Back
          </button>
          {/* <Link to="/home">Go back</Link> */}
        </div>
      </form>
    </div>
  );
};
// Extra Validation To Component
ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
  };
};
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
})(ProfileForm);
