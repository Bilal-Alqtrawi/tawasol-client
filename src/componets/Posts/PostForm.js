import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../redux/modules/posts";

const PostForm =  ({addPost}) => {
    const [text, setText] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        addPost({ text });
        setText("");
    }
    return (
        <div className="post-card">
            <p className="form-title center">
                Create Post
            </p>
            <hr />
            <form className="form1" onSubmit={onSubmit}>
                <div>
                    <textarea placeholder="what's on your mind?" name="text" value={text} required onChange={(e) => setText(e.target.value)} />
                </div>
                <input type="submit" value="Post" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default connect(null, { addPost })(PostForm)