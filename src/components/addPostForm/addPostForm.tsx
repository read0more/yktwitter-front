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
  };

  const handleChange =
    (setFunc: React.Dispatch<React.SetStateAction<any>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFunc(event.target.value);
    };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={post} onChange={handleChange(setPost)} />
      <button type="submit">post</button>
    </form>
  );
};

export default AddPostForm;
