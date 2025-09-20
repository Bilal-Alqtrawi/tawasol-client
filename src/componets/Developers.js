import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfileById, getProfiles } from "../redux/modules/profiles";
import defaultImg from "../assets/default.png";
import Spinner from "./Spinner";

function Developers({ user, getProfiles, profiles: { profiles, loading } }) {
  // getProfiles();
  useEffect(
    function () {
      if (profiles.length > 0) return;
      getProfiles();
    },
    [getProfiles, profiles.length]
  );

  return loading ? (
    <Spinner />
  ) : (
    <div className="row">
      {profiles
        .filter((profile) => profile.user._id !== user._id)
        .map((profile) => {
          return (
            <div className="column" key={profile.user._id}>
              <Link to={`/profile/${profile.user._id}`}>
                <Developer profile={profile} />
              </Link>
            </div>
          );
        })}
    </div>
  );
}

const Developer = ({ profile }) => {
  const [errored, setErrored] = useState(false);
  const [image, setImage] = useState(profile.image);

  const { id } = useParams();

  console.log(id);

  function onError() {
    if (!errored) {
      setErrored(true);
      setImage(defaultImg);
    }
  }

  // useEffect(
  //   function () {
  //     getProfileById(id);
  //   },
  //   [id]
  // );

  return (
    <div className="card">
      <img onError={onError} src={image} alt=""></img>
      <div className="card-container">
        <p>{profile.user.name}</p>
        <p className="title">{profile.status}</p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.users.user,
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getProfiles })(Developers);
