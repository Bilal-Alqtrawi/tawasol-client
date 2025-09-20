import { formatDate } from "../../utils";

const Experience = ({ profile, deleteExperience }) => {
  if (!profile?.experience || profile.experience.length === 0) {
    return <p className="no-data-message">No experience details added yet.</p>;
  }

  return (
    <div className="timeline-container">
      {profile.experience.map((exp) => (
        <div key={exp._id} className="timeline-item">
          <div className="timeline-icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="timeline-content">
            <span className="timeline-date">
              {formatDate(exp.from)} - {exp.current ? "Present" : formatDate(exp.to)}
            </span>
            <h4 className="timeline-title">{exp.title}</h4>
            <p className="timeline-subtitle">{exp.company}</p>
            {exp.description && <p className="timeline-description">{exp.description}</p>}
          </div>
          {deleteExperience && (
            <button onClick={() => deleteExperience(exp._id)} className="btn-delete-item" title="Delete">
              <i className="fas fa-trash" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Experience;
