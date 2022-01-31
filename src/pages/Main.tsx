import React, { useEffect } from "react";
import AddPostForm from "../components/addPostForm/addPostForm";
import Posts from "../components/posts/posts";
import Customer from "../interfaces/Customer";
import Post from "../interfaces/Post";

interface Props {
  customer: Customer | null;
  posts: Post[];
  addPost: (postText: string) => void;
  readAllPost: () => void;
  updatePost: (post: Post) => void;
  deletePost: (post: Post) => void;
  startSocket: () => void;
}

const Main: React.FC<Props> = ({
  customer,
  posts,
  addPost,
  readAllPost,
  updatePost,
  deletePost,
  startSocket,
}) => {
  useEffect(() => {
    (async function () {
      await readAllPost();
      startSocket();
    })();
  }, [readAllPost, startSocket]);

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
