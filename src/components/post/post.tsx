import React, { useState } from "react";
import Customer from "../../interfaces/Customer";
import PostInterface from "../../interfaces/Post";
import styles from "./post.module.css";

interface Props {
  customer: Customer | null;
  post: PostInterface;
  onUpdate: (post: PostInterface) => void;
  onDelete: (post: PostInterface) => void;
}

const Post: React.FC<Props> = ({ customer, post, onUpdate, onDelete }) => {
  const isMine = post.customer_id === customer?.entity_id;
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateText, setUpdateText] = useState(post.content);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onUpdate({ ...post, content: updateText });
    setIsUpdate(false);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isUpdate) {
      onUpdate({ ...post, content: updateText });
    }
    setIsUpdate(!isUpdate);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    onDelete(post);
  };

  const handleChange =
    (setFunc: React.Dispatch<React.SetStateAction<any>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFunc(event.target.value);
    };

  return (
    <li>
      {isUpdate ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={updateText}
            onChange={handleChange(setUpdateText)}
          />
        </form>
      ) : (
        <span>{post.content}</span>
      )}
      <span>{post.created_at}</span>
      {isMine ? (
        <>
          <button onClick={handleUpdate}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      ) : (
        ""
      )}
    </li>
  );
};

export default Post;
