import React, { useState } from "react";
import styles from "./loginForm.module.css";

interface Props {
  handleLogin: (id: string, password: string) => Promise<void>;
  formToggleCheckbox: JSX.Element;
}

const LoginForm: React.FC<Props> = ({ handleLogin, formToggleCheckbox }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleLogin(id, password);
  };

  const handleChange =
    (setFunc: React.Dispatch<React.SetStateAction<any>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFunc(event.target.value);
    };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={id} onChange={handleChange(setId)} />
      <input
        type="password"
        value={password}
        onChange={handleChange(setPassword)}
      />
      <button type="submit">submit</button>
      {formToggleCheckbox}
    </form>
  );
};

export default LoginForm;
