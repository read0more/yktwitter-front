import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Customer from "../../interfaces/Customer";
import styles from "./header.module.css";

interface Props {
  customer: Customer | null;
  logout: () => void;
  readMyPost: () => void;
  readAllPost: () => Promise<void>;
}

const Header: React.FC<Props> = ({
  customer,
  logout,
  readMyPost,
  readAllPost,
}) => {
  return customer ? (
    <header className={styles.header}>
      <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
      <span className={styles.title}>ZZAPwitter</span>
      <span className={styles.name}>@{customer.name}</span>
      <div className={styles.customer_menu}>
        <span onClick={readAllPost}>전체트윗</span>
        <span onClick={readMyPost}>내 트윗</span>
        <span onClick={logout}>로그아웃</span>
      </div>
    </header>
  ) : (
    <header className={styles.header}>
      <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
      <span className={styles.title}>ZZAPwitter</span>
    </header>
  );
};

export default Header;
