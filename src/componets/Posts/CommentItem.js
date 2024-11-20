import { connect } from "react-redux";
import { deleteComment } from "../../redux/modules/posts";
import { formatDate, getProfileImage } from "../../utils";

const CommentItem = ({
  postId,
  comment: { _id, user, text, name, date },
  users,
  deleteComment,
}) => {
  return (
    <div className="post-card">
      <div className="row">
        <div className="column">
          <img
            className="profile"
            src={getProfileImage(user)}
            alt="user_image"
          />
          <p>{name}</p>
        </div>
        <div
          className="column"
          style={{ width: "75%", textAlign: "left", marginTop: 10 }}
        >
          <p>{text}</p>
          <small style={{ color: "gray" }}>Posted at {formatDate(date)}</small>
          {!user.loading && user === users.user._id && (
            <button
              type="button"
              className="btn btn-light"
              onClick={() => deleteComment(postId, _id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
