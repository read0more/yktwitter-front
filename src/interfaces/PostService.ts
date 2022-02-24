import Post from "./Post";

export default interface PostService {
  create(postText: string): Promise<void>;
  readAll(): Promise<Post[]>;
  update(post: Post): void;
  delete(post: Post): void;
}
