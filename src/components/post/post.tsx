import React from "react";
import PostInterface from "../../interfaces/Post";
import styles from "./addPostForm.module.css";

interface Props {
  post: PostInterface;
}

const Post: React.FC<Props> = ({ post }) => {
  return <div>post</div>;
};

export default Post;
