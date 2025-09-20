import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { getProfileById } from "../redux/modules/profiles";
import defaultImage from "../assets/default.png";
import BasicInfo from "./ProfileInfo/BasicInfo";
import Education from "./ProfileInfo/Education";
import Experience from "./ProfileInfo/Experience";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Profile = ({
  getProfileById,
  profiles: { selectedProfile, loading },
}) => {
  // const [image, setImage] = useState("");
  // const [errored, setErrored] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  /*   useEffect(() => {
    if (selectedProfile && selectedProfile.image) {
      setImage(selectedProfile.image);
    } else {
      setImage(defaultImage);
    }
    if (selectedProfile) {
      setImage(selectedProfile.image || defaultImage);
    }
  }, [selectedProfile]);
 */

  if (loading || !selectedProfile) {
    return <Spinner />;
  }

  const { user, image, social, education, experience, skills } =
    selectedProfile;
  console.log(selectedProfile);

  return (
    <div className="profile-page-container">
      <div className="profile-hero">
        <div className="hero-background"></div>
        <img
          src={image || defaultImage}
          className="hero-avatar"
          alt={`${user.name}'s profile`}
        />
        <h1 className="hero-name">{user.name}</h1>
        <div className="hero-basic-info">
          <BasicInfo profile={selectedProfile} />
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

        {/* العمود الأيمن: التعليم والخبرة */}
        <div className="profile-right-column">
          {education && education.length > 0 && (
            <div className="info-card">
              <h3 className="card-title">
                <i className="fas fa-graduation-cap"></i> Education
              </h3>
              <Education profile={selectedProfile} />
            </div>
          )}

          {experience && experience.length > 0 && (
            <div className="info-card">
              <h3 className="card-title">
                <i className="fas fa-briefcase"></i> Experience
              </h3>
              <Experience profile={selectedProfile} />
            </div>
          )}
        </div>
      </div>

      {/*   <div className="content-grid">
        {education.length > 0 && (
          <div className="info-card">
            <h3 className="card-title">
              <i className="fas fa-graduation-cap"></i> Education
            </h3>
            <Education profile={selectedProfile} />
          </div>
        )}

        {experience.length > 0 && (
          <div className="info-card">
            <h3 className="card-title">
              <i className="fas fa-briefcase"></i> Experience
            </h3>
            <Experience profile={selectedProfile} />
          </div>
        )}
      </div> */}
    </div>
  );
};

/*  return (
    <div className="profile">
      
        <div>
          <div className="home-row">
            <div
              style={{ textAlign: "center" }}
              className="home-column home-column-profile"
            >
              <img
                src={image}
                className="profile-picture"
                alt="profile"
                onError={onError}
              />
              <p className="name">{user?.name}</p>
            </div>
            <div className="home-column">
              <BasicInfo profile={selectedProfile} />
              <div className="social">
                {selectedProfile?.social
                  ? Object.keys(social)
                      .filter((media) => social[media] !== "")
                      .map((media) => {
                        return (
                          <a
                            key={media}
                            rel="noreferrer"
                            target="_blank"
                            href={social[media]}
                          >
                            <i className={`fab fa-${media} fa-2x`}></i>
                          </a>
                        );
                      })
                  : null}
              </div>
            </div>
          </div>
          <div className="home-row">
            <div className="home-column">
              <div className="home-row">
                <div className="home-column">
                  <h3>Education</h3>
                </div>
              </div>
              <Education profile={selectedProfile} />
            </div>
            <div className="home-column">
              <div className="home-row">
                <div className="home-column">
                  <h3>Experience</h3>
                </div>
              </div>
              <Experience profile={selectedProfile} />
            </div>
          </div>
        </div>
      )}
    </div>
  ); */

const mapStateToProps = (state) => {
  return { profiles: state.profiles };
};
export default connect(mapStateToProps, { getProfileById })(Profile);
