import qs from "qs";
import { AxiosInstance } from "axios";
import PostService from "../interfaces/PostService";

export default class PostWebService implements PostService {
  private basePath = "/posts";
  constructor(private http: AxiosInstance) {}

  async create(postText: string): Promise<void> {
    await this.http.post(
      `${this.basePath}`,
      qs.stringify({ content: postText })
    );
  }
}
