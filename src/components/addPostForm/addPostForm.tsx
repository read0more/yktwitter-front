import React from "react";
import styles from "./addPostForm.module.css";

interface Props {
  onCreate: () => void;
}

const AddPostForm: React.FC<Props> = ({ onCreate }) => {
  return <span>addPostForm</span>;
};

export default AddPostForm;
