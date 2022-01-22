import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Customer from "../../interfaces/Customer";
import styles from "./header.module.css";

interface Props {
  customer: Customer | null;
  logout: () => void;
}

const Header: React.FC<Props> = ({ customer, logout }) => {
  return customer ? (
    <header className={styles.header}>
      <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
      <span className={styles.title}>ZZAPwitter</span>
      <div className={styles.customer_menu}>
        <a href="">전체트윗</a>
        <a href="">내 트윗</a>
        <a href="">로그아웃</a>
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
