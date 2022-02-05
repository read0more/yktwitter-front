import qs from "qs";
import { AxiosInstance } from "axios";
import PostService from "../interfaces/PostService";
import Post from "../interfaces/Post";

export default class PostWebService implements PostService {
  private basePath = "/posts";
  constructor(private http: AxiosInstance) {}

  async create(postText: string): Promise<void> {
    await this.http.post(
      `${this.basePath}`,
      qs.stringify({ content: postText })
    );
  }

  async readAll(): Promise<Post[]> {
    const response = await this.http.get(this.basePath);
    const responseData: any[] = response.data ?? [];
    return responseData;
  }

  update(post: Post): void {
    this.http.put(
      `${this.basePath}/${post.entity_id}`,
      qs.stringify({ content: post.content })
    );
  }

  delete(post: Post) {
    this.http.delete(`${this.basePath}/${post.entity_id}`);
  }
}
