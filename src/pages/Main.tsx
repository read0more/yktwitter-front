import React, { useState } from "react";
import AddPostForm from "../components/addPostForm/addPostForm";
import Posts from "../components/posts/posts";
import Customer from "../interfaces/Customer";
import Post from "../interfaces/Post";
import PostService from "../interfaces/PostService";

interface Props {
  customer: Customer | null;
  postService: PostService;
}

const Main: React.FC<Props> = ({ customer, postService }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (postText: string) => {
    postService.create(postText);
  };

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
