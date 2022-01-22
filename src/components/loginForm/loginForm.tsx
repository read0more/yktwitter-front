import React from "react";
import AuthService from "../../interfaces/AuthService";
import { formType } from "../../pages/Login";
import styles from "./loginForm.module.css";

interface Props {
  authService: AuthService;
  setMode: React.Dispatch<React.SetStateAction<formType>>;
}

const LoginForm: React.FC<Props> = ({ authService, setMode }) => {
  return <span>loginForm</span>;
};

export default LoginForm;
