import Customer from "./Customer";

export default interface CustomerService {
  registration(customer: Customer): Promise<void>;
}
