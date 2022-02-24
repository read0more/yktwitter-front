import React, { useState } from "react";
import PostInterface from "../../interfaces/Post";
import styles from "./post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isMine: boolean;
  post: PostInterface;
  onUpdate: (post: PostInterface) => void;
  onDelete: (post: PostInterface) => void;
}

const Post: React.FC<Props> = ({ isMine, post, onUpdate, onDelete }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateText, setUpdateText] = useState(post.content);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onUpdate({ ...post, content: updateText });
    setIsUpdate(false);
  };

  const handleUpdate = () => {
    if (isUpdate) {
      onUpdate({ ...post, content: updateText });
    }
    setIsUpdate(!isUpdate);
  };

  const handleDelete = () => {
    onDelete(post);
  };

  const handleChange =
    (setFunc: React.Dispatch<React.SetStateAction<any>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFunc(event.target.value);
    };

  return (
    <li className={styles.li}>
      <img
        src={post.customer_profile_picture_url}
        alt="profile"
        className={styles["profile-image"]}
      />
      <div>
        <div className={styles["customer-info"]}>
          <span className={styles.name}>{post.customer_name}</span>
          <span className={styles.id}>@{post.customer_id}</span>
          <span className={styles.date}>{post.created_at}</span>
        </div>
        {isUpdate && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={updateText}
              onChange={handleChange(setUpdateText)}
            />
          </form>
        )}
        {isUpdate ? "" : <div>{post.content}</div>}
      </div>

      {isMine ? (
        <div className={styles["icon-box"]}>
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.icon}
            onClick={handleDelete}
          />
          <FontAwesomeIcon
            icon={faPencilAlt}
            className={styles.icon}
            onClick={handleUpdate}
          />
        </div>
      ) : (
        ""
      )}
    </li>
  );
};

export default Post;
