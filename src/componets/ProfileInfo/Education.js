import React from "react";
import { formatDate } from "../../utils";

const Education = ({ profile, deleteEducation }) => {
  if (!profile?.education || profile.education.length === 0) {
    return <p className="no-data-message">No education details added yet.</p>;
  }
  return (
    <div className="timeline-container">
      {profile.education.map((edu) => (
        <div key={edu._id} className="timeline-item">
          <div className="timeline-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="timeline-content">
            <span className="timeline-date">
              {formatDate(edu.from)} -{" "}
              {edu.current ? "Present" : formatDate(edu.to)}
            </span>
            <h4 className="timeline-title">
              {edu.degree} in {edu.fieldofstudy}
            </h4>
            <p className="timeline-subtitle">{edu.school}</p>
            {edu.description && (
              <p className="timeline-description">{edu.description}</p>
            )}
          </div>
          {deleteEducation && (
            <button
              onClick={() => deleteEducation(edu._id)}
              className="btn-delete-item"
              title="Delete"
            >
              <i className="fas fa-trash" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Education;
