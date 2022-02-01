import React, { useEffect } from "react";
import AddPostForm from "../components/addPostForm/addPostForm";
import Posts from "../components/posts/posts";
import Customer from "../interfaces/Customer";
import Post from "../interfaces/Post";
import WebSocketService from "../services/WebSocketService";

interface Props {
  customer: Customer | null;
  posts: Post[];
  addPost: (postText: string) => void;
  readAllPost: () => void;
  updatePost: (post: Post) => void;
  deletePost: (post: Post) => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const Main: React.FC<Props> = ({
  customer,
  posts,
  addPost,
  readAllPost,
  updatePost,
  deletePost,
  setPosts,
}) => {
  useEffect(() => {
    const webSocketService = new WebSocketService("ws://localhost:3000");

    (async function () {
      await readAllPost();
      webSocketService.addEvent("changed_post", (changedPost: Post[]) => {
        setPosts(changedPost);
      });
    })();

    return () => {
      webSocketService.close();
    };
  }, [readAllPost, setPosts]);

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
