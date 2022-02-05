import React from "react";
import Customer from "../../interfaces/Customer";
import PostInterface from "../../interfaces/Post";
import Post from "../post/post";
import styles from "./posts.module.css";

interface Props {
  customer: Customer | null;
  posts: PostInterface[];
  onUpdate: (post: PostInterface) => void;
  onDelete: (post: PostInterface) => void;
}

const Posts: React.FC<Props> = ({ posts, customer, onUpdate, onDelete }) => {
  return (
    <ul className={styles.ul}>
      {posts.map((post) => (
        <Post
          key={post.entity_id}
          isMine={post.customer_entity_id === customer?.entity_id}
          post={post}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default Posts;
