export default interface AuthService {
  login(id: string, password: string): Promise<string>;
}
