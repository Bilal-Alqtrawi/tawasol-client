import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../redux/modules/posts";
import PostForm from "./PostForm";
import PostItem from "./PostItem";
function Posts({ getPosts, posts }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      <PostForm />
      <div>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});
export default connect(mapStateToProps, { getPosts })(Posts);
