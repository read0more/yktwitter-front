import qs from "qs";
import { AxiosInstance } from "axios";
import Customer from "../interfaces/Customer";
import CustomerService from "../interfaces/CustomerService";

export default class CustomerWebService implements CustomerService {
  private basePath = "/customer";
  constructor(private http: AxiosInstance) {}

  async registration(customer: Customer): Promise<void> {
    await this.http.post(`${this.basePath}`, qs.stringify(customer));
  }
}
