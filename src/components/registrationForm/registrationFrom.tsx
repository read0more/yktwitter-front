import React from "react";
import CustomerService from "../../interfaces/CustomerService";
import styles from "./registration.module.css";

interface Props {
  customerService: CustomerService;
  formToggleCheckbox: JSX.Element;
}

const RegistrationForm: React.FC<Props> = ({
  customerService,
  formToggleCheckbox,
}) => {
  return <span>registaration form</span>;
};

export default RegistrationForm;
