import Customer from "./Customer";

export default interface AuthService {
  login(id: string, password: string): Promise<string>;
  me(): Promise<Customer>;
}
