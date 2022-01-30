export default interface PostService {
  create(postText: string): Promise<void>;
}
