const BasicInfo = ({ profile }) => {
  if (!profile) {
    return null;
  }

  const { bio, location, country, status } = profile;

  return (
    <div className="basic-info-container">
      {status && <p className="info-status">{status}</p>}

      {bio && <p className="info-bio">{bio}</p>}

      <div className="location-details">
        {location && (
          <span className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            {location}
          </span>
        )}
        {country && (
          <span className="info-item">
            <i className="fas fa-flag"></i>
            {country}
          </span>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
