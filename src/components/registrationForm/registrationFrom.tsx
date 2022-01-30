import React, { useState } from "react";
import Customer from "../../interfaces/Customer";
import styles from "./registration.module.css";

interface Props {
  handleRegistration: (customer: Customer) => Promise<void>;
  formToggleCheckbox: JSX.Element;
}

const RegistrationForm: React.FC<Props> = ({
  handleRegistration,
  formToggleCheckbox,
}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newCustomer = {
      entity_id: "",
      id,
      password,
      name,
      email,
      profile_picture_url: profilePictureURL,
    };

    handleRegistration(newCustomer);
  };

  const handleChange =
    (setFunc: React.Dispatch<React.SetStateAction<any>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFunc(event.target.value);
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={id}
        onChange={handleChange(setId)}
        placeholder="id"
        className={styles.input}
        required
      />
      <input
        type="password"
        value={password}
        onChange={handleChange(setPassword)}
        placeholder="password"
        className={styles.input}
        required
      />
      <input
        type="text"
        value={name}
        onChange={handleChange(setName)}
        placeholder="name"
        className={styles.input}
        required
      />
      <input
        type="email"
        value={email}
        onChange={handleChange(setEmail)}
        placeholder="email"
        className={styles.input}
        required
      />
      <input
        type="url"
        value={profilePictureURL}
        onChange={handleChange(setProfilePictureURL)}
        placeholder="profile picture URL"
        className={styles.input}
        required
      />

      <div className={styles.checkbox}>{formToggleCheckbox}</div>
      <button type="submit" className={styles.button}>
        Sign up
      </button>
    </form>
  );
};

export default RegistrationForm;
