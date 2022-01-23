import { AxiosInstance } from "axios";
import CustomerService from "../interfaces/CustomerService";

export default class CustomerWebService implements CustomerService {
  constructor(private http: AxiosInstance) {}
}
