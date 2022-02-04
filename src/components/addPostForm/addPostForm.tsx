import React, { useState } from "react";
import styles from "./addPostForm.module.css";

interface Props {
  onCreate: (postText: string) => void;
}

const AddPostForm: React.FC<Props> = ({ onCreate }) => {
  const [post, setPost] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onCreate(post);
    setPost("");
  };

  const handleChange =
    (setFunc: React.Dispatch<React.SetStateAction<any>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFunc(event.target.value);
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={post}
        onChange={handleChange(setPost)}
        className={styles.input}
        placeholder="추가할 내용을 입력"
      />
      <button type="submit" className={styles.button}>
        post
      </button>
    </form>
  );
};

export default AddPostForm;
