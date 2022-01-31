import React, { useState, useEffect } from "react";
import AddPostForm from "../components/addPostForm/addPostForm";
import Posts from "../components/posts/posts";
import Customer from "../interfaces/Customer";
import Post from "../interfaces/Post";
import PostService from "../interfaces/PostService";
import { io } from "socket.io-client";

interface Props {
  customer: Customer | null;
  postService: PostService;
}

const Main: React.FC<Props> = ({ customer, postService }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (postText: string) => {
    postService.create(postText);
  };

  useEffect(() => {
    (async function () {
      const posts = await postService.readAll();
      setPosts(posts);
    })();

    const socket = io("ws://localhost:3000");
  }, [postService]);

  const updatePost = (post: Post) => {
    postService.update(post);
  };

  const deletePost = (post: Post) => {
    postService.delete(post);
  };

  return (
    <>
      <AddPostForm onCreate={addPost} />
      <Posts
        posts={posts}
        customer={customer}
        onUpdate={updatePost}
        onDelete={deletePost}
      />
    </>
  );
};

export default Main;
