import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
} from "../../redux/modules/profiles";

import Select from "react-select";
import defaultImg from "../../assets/default.png";

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
  id: "",
  name: "",
  image: "",
};

const options = [
  { value: "", label: "* Select Status" },
  { value: "Developer", label: "Developer" },
  { value: "Junior Developer", label: "Junior Developer" },
  { value: "Senior Developer", label: "Senior Developer" },
  { value: "Student", label: "Student" },
  { value: "Instructor", label: "Instructor" },
  { value: "Intern", label: "Intern" },
  { value: "Other", label: "Other" },
];

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "48px",
    borderColor: state.isFocused ? "#9a206d" : "#ccc",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(154, 32, 109, 0.15)" : "none",
    borderRadius: "8px",
    "&:hover": {
      borderColor: state.isFocused ? "#9a206d" : "#aaa",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#9a206d"
      : state.isFocused
      ? "#f8f9fa"
      : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    "&:active": {
      backgroundColor: "#9a206d",
    },
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#aaa",
  }),
};

const ProfileForm = ({
  user,
  profiles: { profile, loading },
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
  history,
}) => {
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!profile) {
      getCurrentProfile();
      setUserName(user.name);
    }
    if (profile && !loading) {
      const profileData = { ...initialState };

      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }

      if (profile.social) {
        for (const key in profile.social) {
          if (key in profileData) profileData[key] = profile.social[key];
        }
      }
      if (profile.user) {
        for (const key in profile.user) {
          if (key in profileData) profileData[key] = profile.user[key];
          if (profile.user.name) {
            setUserName(profileData[key]);
          }
        }
      }
      if (profile.image) {
        console.log(profile.image);
        profileData["image"] = profile["image"];
        setUserImage(profile["image"]);
      }

      setFormData(profileData);

      console.log(profileData);
    }
  }, [loading, getCurrentProfile, profile, user.name]);

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
    id,
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!status) {
      alert("Please select your professional status.");
      return "";
    }

    await createProfile(
      { ...formData, image: userImage },
      history,
      profile ? true : false
    );

    navigate("/home");
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const data = new FormData();

      data.append("file", e.target.files[0]);

      uploadProfileImage(data).then((res) => setUserImage(res?.image));
      // if (img) {
      //   setUserImage(img);
      // }
    }
  };

  const onChange = (e) => {
    if (e.target.name === "name") {
      setUserName(e.target.value);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, status: selectedOption.value });
  };

  console.log(profile);

  return (
    <div className="form-page-container">
      <div className="form-header">
        <h1>{profile ? "Edit Your Profile" : "Create Your Profile"}</h1>
        <p>Keep your professional information up to date.</p>
      </div>

      <form className="modern-form" onSubmit={onSubmit}>
        <input type="text" value={id} name="id" hidden />
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group span-2">
              <label htmlFor="name">User name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userName}
                onChange={onChange}
              />
            </div>
            <div className="form-group span-2">
              <label htmlFor="status">Professional Status *</label>
              <Select
                options={options}
                styles={customSelectStyles}
                id="status"
                name="status"
                value={
                  options.find((option) => option.value === status) ||
                  options[0]
                }
                onChange={handleSelectChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                placeholder="e.g., Google"
                name="company"
                value={company}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                placeholder="https://your-site.com"
                name="website"
                value={website}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                placeholder="e.g., Gaza"
                name="location"
                value={location}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                placeholder="e.g., Palestine"
                name="country"
                value={country}
                onChange={onChange}
              />
            </div>

            <div className="form-group span-2">
              <label htmlFor="skills">Skills *</label>
              <input
                id="skills"
                type="text"
                placeholder="e.g., HTML, CSS, JavaScript"
                name="skills"
                value={skills}
                onChange={onChange}
                required
              />
              <small>Please use comma separated values.</small>
            </div>

            <div className="form-group span-2">
              <label htmlFor="bio">Short Bio</label>
              <textarea
                id="bio"
                placeholder="Tell us a little about yourself"
                name="bio"
                value={bio}
                onChange={onChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label>Profile Picture</label>
              <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fas fa-cloud-upload-alt"></i>
                <span>
                  {profile?.image ? "Change Picture" : "Upload Picture"}
                </span>
              </label>
              <input
                id="file-upload"
                type="file"
                name="image"
                onChange={onFileChange}
              />
            </div>

            <div className="form-group">
              <label>Social Networks</label>
              <button
                type="button"
                className="toggle-social-btn"
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
              >
                <i
                  className={`fas ${
                    displaySocialInputs ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
                {displaySocialInputs
                  ? "Hide Social Links"
                  : "Show Social Links"}
              </button>
            </div>
          </div>
        </div>

        {displaySocialInputs && (
          <div className="form-section social-inputs-section">
            <div className="form-grid">
              <div className="social-input-group">
                <i className="fab fa-twitter"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={onChange}
                />
              </div>
              <div className="social-input-group">
                <i className="fab fa-facebook"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={onChange}
                />
              </div>
              <div className="social-input-group">
                <i className="fab fa-youtube"></i>
                <input
                  type="text"
                  placeholder="Youtube URL"
                  name="youtube"
                  value={youtube}
                  onChange={onChange}
                />
              </div>
              <div className="social-input-group">
                <i className="fab fa-linkedin"></i>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={onChange}
                />
              </div>
              <div className="social-input-group">
                <i className="fab fa-instagram"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={onChange}
                />
              </div>
              <div className="social-input-group">
                <i className="fab fa-github"></i>
                <input
                  type="text"
                  placeholder="Github URL"
                  name="github"
                  value={github}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
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
    user: state.users.user,
    profiles: state.profiles,
  };
};
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
})(ProfileForm);
