import React, { useState } from "react";
import LoginForm from "../components/loginForm/loginForm";
import RegistrationForm from "../components/registrationForm/registrationFrom";
import AuthService from "../interfaces/AuthService";
import CustomerService from "../interfaces/CustomerService";

interface Props {
  authService: AuthService;
  customerService: CustomerService;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<Props> = ({ authService, customerService, setToken }) => {
  const [isRegistration, setIsRegistration] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRegistration(event.target.checked);
  };

  const formToggleCheckbox = (
    <>
      <input type="checkbox" onChange={handleCheckboxChange} />
      Create a new account?
    </>
  );

  const handleLogin = async (id: string, password: string) => {
    const token = await authService.login(id, password);
    setToken(token);
  };

  return isRegistration ? (
    <RegistrationForm
      customerService={customerService}
      formToggleCheckbox={formToggleCheckbox}
    />
  ) : (
    <LoginForm
      handleLogin={handleLogin}
      formToggleCheckbox={formToggleCheckbox}
    />
  );
};

export default Login;
