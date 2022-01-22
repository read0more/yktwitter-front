import React from "react";
import PostInterface from "../../interfaces/Post";
import Post from "../post/post";
import styles from "./addPostForm.module.css";

interface Props {
  posts: PostInterface[];
}

const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </>
  );
};

export default Posts;
