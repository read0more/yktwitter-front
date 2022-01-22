import React, { useState } from "react";
import LoginForm from "../components/loginForm/loginForm";
import RegistrationForm from "../components/registrationForm/registrationFrom";
import Customer from "../interfaces/Customer";
import AuthMysqlService from "../services/AuthMysqlService";
import CustomerMysqlService from "../services/CustomerMysqlService";

interface Props {
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
}

export type formType = "login" | "registration";

const Login: React.FC<Props> = ({ setCustomer }) => {
  const [mode, setMode] = useState<formType>("login");
  const authMysqlService = new AuthMysqlService();
  const customerMysqlService = new CustomerMysqlService();

  return mode === "login" ? (
    <LoginForm authService={authMysqlService} setMode={setMode} />
  ) : (
    <RegistrationForm
      customerService={customerMysqlService}
      setMode={setMode}
    />
  );
};

export default Login;
