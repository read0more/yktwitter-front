import qs from "qs";
import { AxiosInstance } from "axios";
import AuthService from "../interfaces/AuthService";
import Customer from "../interfaces/Customer";

export default class AuthWebService implements AuthService {
  private basePath = "/auth";
  constructor(private http: AxiosInstance) {}

  async login(id: string, password: string): Promise<string> {
    const response = await this.http.post(
      `${this.basePath}/login`,
      qs.stringify({ id, password })
    );

    return response.data;
  }

  async me(): Promise<Customer> {
    const response = await this.http.get(`${this.basePath}/me`);
    const customer: Customer = {
      entity_id: response.data._entity_id,
      id: response.data._id,
      password: response.data._password,
      name: response.data._name,
      email: response.data._email,
      profile_picture_url: response.data._profilePictureURL,
    };

    return customer;
  }

  async logout(): Promise<String> {
    const response = await this.http.post(`${this.basePath}/logout`);
    return response.data;
  }

  async csrfToken(): Promise<String> {
    const response = await this.http.get(`${this.basePath}/csrf-token`);
    return response.data.csrfToken;
  }
}
