import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../redux/modules/posts";
import { formatDate, getProfileImage } from "../../utils";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  users,
  post: { _id, text, name, user, likes, comments, date },
  showActions,
}) => {
  const toggleLike = (e) => {
    addLike(_id);
    if (e.target.onclick) {
      removeLike(_id);
    }
  }  
  return (
    <div className="post-card">
      <div className="row">
        <div className="column">
          <img
            className="profile"
            src={getProfileImage(user)}
            alt=""
          />
          <p>{name}</p>
        </div>
        <div
          className="column"
          style={{ width: "75%", textAlign: "left", marginTop: 10 }}
        >
          <p>{text}</p>
          <small style={{ color: "gray" }}>Posted at {formatDate(date)}</small>
          {showActions && (
            /*if true will display */
            <div>
              <button
                type="button"
                className="btn btn-light"
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
                  <span className="comment-count" style={{marginLeft: 5}}>{comments.length}</span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
