import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteEducation,
  deleteExperience,
  getCurrentProfile,
} from "../redux/modules/profiles";
import defaultImage from "../assets/default.png";
import BasicInfo from "./ProfileInfo/BasicInfo";
import Education from "./ProfileInfo/Education";
import Experience from "./ProfileInfo/Experience";
import Spinner from "./Spinner";

const Home = ({
  getCurrentProfile,
  deleteEducation,
  deleteExperience,
  profiles: { profile, loading },
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    const el = document.querySelector(".profile-hero");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [pathname]);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (loading && profile === null) {
    return <Spinner message="Loading your profile..." />;
  }

  if (!loading && profile === null) {
    return (
      <div className="empty-state-container">
        <div className="icon">
          <i className="fas fa-user-plus empty-state-icon"></i>
        </div>
        <h2 className="empty-state-title">Welcome to TawaSol!</h2>
        <p className="empty-state-text">
          Create your professional profile to connect with other developers.
        </p>
        <Link to="/create-profile" className="btn btn-primary btn-lg">
          Create Your Profile
        </Link>
      </div>
    );
  }

  const { user, image, social, skills } = profile;

  console.log(image);

  return (
    <div className="profile-page-container">
      <div className="profile-hero">
        <div className="hero-background"></div>
        <img
          src={image ? image : defaultImage}
          className="hero-avatar"
          alt={`${user?.name}'s profile`}
        />
        <h1 className="hero-name">{user?.name}</h1>
        <div className="hero-basic-info">
          <BasicInfo profile={profile} />
        </div>
        <div className="hero-social">
          {social &&
            Object.entries(social)
              .filter(([, url]) => url)
              .map(([media, url]) => (
                <a
                  key={media}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${media}`}></i>
                </a>
              ))}
        </div>
        <Link to="/edit-profile" className="btn-edit-profile">
          <i className="fas fa-pen"></i> Edit Profile
        </Link>
      </div>

      <div className="profile-main-content">
        <div className="profile-left-column">
          {skills && skills.length > 0 && (
            <div className="info-card">
              <h3 className="card-title">
                <i className="fas fa-code"></i> Skills
              </h3>
              <div className="skills-container">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="profile-right-column">
          <div className="info-card">
            <div className="card-header-action">
              <h3>
                <i className="fas fa-graduation-cap"></i> Education
              </h3>
              <Link
                to="/add-education"
                className="btn-add-circle"
                title="Add Education"
              >
                <i className="fa fa-plus"></i>
              </Link>
            </div>
            <Education profile={profile} deleteEducation={deleteEducation} />
          </div>

          <div className="info-card">
            <div className="card-header-action">
              <h3>
                <i className="fas fa-briefcase"></i> Experience
              </h3>
              <Link
                to="/add-experience"
                className="btn-add-circle"
                title="Add Experience"
              >
                <i className="fa fa-plus"></i>
              </Link>
            </div>
            <Experience profile={profile} deleteExperience={deleteExperience} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteEducation,
  deleteExperience,
})(Home);
