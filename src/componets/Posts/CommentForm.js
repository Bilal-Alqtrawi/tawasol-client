import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../../redux/modules/posts";

const CommentForm = ({ addComment }) => {
  const [text, setText] = useState("");
  const { id } = useParams();

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(id, { text });
    setText("");
  };
  return (
    <div className="post-card">
      <p className="form-title center">Leave a comment</p>
      <hr />
      <form className="form1" onSubmit={onSubmit}>
        <div>
          <textarea
            placeholder="Enter your comment"
            name="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <input type="submit" value="Post" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
