import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../redux/modules/posts";
import { formatDate, getProfileImage } from "../../utils";
import { useEffect, useState } from "react";
import { getProfileById } from "../../redux/modules/profiles";
import defaultImg from "../../assets/default.png";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  users,
  post: { _id, text, name, user, likes, comments, date },
  getProfileById,
  showActions,
}) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLike, setIsLike] = useState(false);

  useEffect(
    function () {
      async function getUserProfile() {
        try {
          const res = await getProfileById(user);

          setUserProfile(res);
        } catch (err) {
          console.error(err.message);
        }
      }
      getUserProfile();
    },
    [getProfileById, user]
  );

  const toggleLike = (e) => {
    setIsLike((like) => !like);
    !isLike ? addLike(_id) : removeLike(_id);
  };
  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <img
          className="profile-img"
          src={userProfile?.image ?? defaultImg}
          alt=""
        />
        <div className="user-info">
          <p className="username">{name}</p>
          <small className="date">Posted at {formatDate(date)}</small>
        </div>
      </div>

      {/* Content */}
      <div className="post-content">
        <p>{text}</p>
      </div>

      {/* Footer / Actions */}
      {showActions && (
        <div className="post-actions">
          <button type="button" className="btn-action" onClick={toggleLike}>
            <i className="fas fa-thumbs-up"></i>
            {likes.length > 0 && (
              <span className="count" key={likes.length}>
                {likes.length}
              </span>
            )}
          </button>

          <button
            type="button"
            className="btn-action"
            onClick={() => removeLike(_id)}
          >
            <i className="fas fa-thumbs-down"></i>
          </button>

          <Link to={`/posts/${_id}`} className="btn-action">
            <i className="fas fa-comment"></i>
            {comments.length > 0 && (
              <span className="count">{comments.length}</span>
            )}
          </Link>

          {!user.loading && user === users.user._id && (
            <button
              type="button"
              className="btn-action"
              onClick={() => deletePost(_id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          )}
        </div>
      )}
    </div>
  );

  /*     return (
      <div className="post-card">
        <div className="row">
          <div className="column">
            <img
              className="profile"
              src={userProfile?.image ?? defaultImg}
              alt=""
            />
            <div>
              <p>{name}</p>
              <small style={{ color: "gray" }}>
                Posted at {formatDate(date)}
              </small>
            </div>
          </div>
          <div className="column">
            <p>{text}</p>
          </div>

          <div className="column">
            {showActions && (
              <>
                <button
                  type="button"
                  className="btn btn-light like-btn"
                  onClick={toggleLike}
                >
                  <i className="fas fa-thumbs-up"></i>
                  <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={(e) => {
                    removeLike(_id);
                  }}
                >
                  <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/posts/${_id}`} className="btn btn-primary">
                  Discussion
                  {comments.length > 0 && (
                    <span className="comment-count" style={{ marginLeft: 5 }}>
                      {comments.length}
                    </span>
                  )}
                </Link>
                {!user.loading && user === users.user._id && (
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => deletePost(_id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    ); */
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  users: state.users,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  getProfileById,
})(PostItem);
