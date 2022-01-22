import React, { useState } from "react";
import AddPostForm from "../components/addPostForm/addPostForm";
import Posts from "../components/posts/posts";
import Customer from "../interfaces/Customer";
import Post from "../interfaces/Post";

interface Props {
  customer: Customer | null;
}

const Main: React.FC<Props> = ({ customer }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const addPost = () => {};
  const updatePost = () => {};
  const deletePost = () => {};
  return (
    <>
      <AddPostForm onCreate={addPost} />
      <Posts posts={posts} />
    </>
  );
};

export default Main;
