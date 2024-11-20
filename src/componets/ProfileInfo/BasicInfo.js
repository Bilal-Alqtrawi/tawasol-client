import React from "react";

const BasicInfo = ({ profile }) => {
  return (
    <div>
      <div className="container">
        <p>{profile.bio}</p>
      </div>
      <div className="container">
        <p>
          &#127759; Lives In <b>{profile.location}</b>
        </p>
      </div>
      <div className="container">
        <p>
          &#127968; from <b>{profile.country}</b>
        </p>
      </div>
      <div className="container">
        <p>
          {profile.skills.map((skill, index) => {
            return <Skills key={index} skills={skill} />;
          })}
        </p>
      </div>
    </div>
  );
};
const Skills = ({ skills: skill }) => {
  return (
    <div>
      <span>&#10004; {skill}</span>
    </div>
  );
};
export default BasicInfo;
