import React from "react";
import Customer from "../../interfaces/Customer";
import PostInterface from "../../interfaces/Post";
import styles from "./addPostForm.module.css";

interface Props {
  customer: Customer | null;
  post: PostInterface;
}

const Post: React.FC<Props> = ({ customer, post }) => {
  const isMine = post.customer_id === customer?.entity_id;

  return (
    <li>
      <span>{post.content}</span>
      <span>{post.created_at}</span>
      {isMine ? (
        <>
          <button>수정</button>
          <button>삭제</button>
        </>
      ) : (
        ""
      )}
    </li>
  );
};

export default Post;
