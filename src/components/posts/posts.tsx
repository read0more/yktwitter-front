import React from "react";
import Customer from "../../interfaces/Customer";
import PostInterface from "../../interfaces/Post";
import Post from "../post/post";
import styles from "./addPostForm.module.css";

interface Props {
  customer: Customer | null;
  posts: PostInterface[];
  onUpdate: (post: PostInterface) => void;
  onDelete: (post: PostInterface) => void;
}

const Posts: React.FC<Props> = ({ posts, customer, onUpdate, onDelete }) => {
  return (
    <ul>
      {posts.map((post) => (
        <Post
          key={post.entity_id}
          customer={customer}
          post={post}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default Posts;
