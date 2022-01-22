import React from "react";
import CustomerService from "../../interfaces/CustomerService";
import { formType } from "../../pages/Login";
import styles from "./registration.module.css";

interface Props {
  customerService: CustomerService;
  setMode: React.Dispatch<React.SetStateAction<formType>>;
}

const RegistrationForm: React.FC<Props> = ({ customerService, setMode }) => {
  return <span>registaration form</span>;
};

export default RegistrationForm;
