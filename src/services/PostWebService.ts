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
    const posts: Post[] = responseData.map((data) => ({
      entity_id: data.entityId,
      customer_id: data.customerId,
      content: data.content,
      created_at: data.createdAt,
    }));

    return posts;
  }

  async update(post: Post): Promise<Post> {
    const response = await this.http.put(
      `${this.basePath}/${post.entity_id}`,
      qs.stringify({ content: post.content })
    );

    return {
      entity_id: response.data.entityId,
      customer_id: response.data.customerId,
      content: response.data.content,
      created_at: response.data.createdAt,
    };
  }
}
