import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/header/header";
import Customer from "./interfaces/Customer";
import Login from "./pages/Login";
import Main from "./pages/Main";
import AuthWebService from "./services/AuthWebService";
import axios from "axios";
import CustomerWebService from "./services/CustomerWebService";
import styles from "./App.module.css";
import PostWebService from "./services/PostWebService";

function App() {
  const LOCAL_STORAGE_TOKEN_NAME = "token";
  const [token, setToken] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const http = useMemo(() => {
    const http = axios.create({
      baseURL: process.env.REACT_APP_WEB_SERVICE_BASEURL,
    });
    http.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    return http;
  }, []);

  const authWebService = useMemo(() => new AuthWebService(http), [http]);
  const customerWebService = useMemo(
    () => new CustomerWebService(http),
    [http]
  );
  const postWebService = useMemo(() => new PostWebService(http), [http]);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_TOKEN_NAME
    );
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [http, token]);

  useEffect(() => {
    if (!token) return;
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    authWebService.me().then((customer) => {
      setCustomer(customer);
    });
  }, [authWebService, http.defaults.headers.common, token]);

  // todo: localstorage에 token 있을경우 로그인 화면 잠깐 깜빡이니 로딩화면 추가
  const startPage = customer ? (
    <Main customer={customer} postService={postWebService} />
  ) : (
    <Login
      authService={authWebService}
      customerService={customerWebService}
      setToken={setToken}
    />
  );

  const logout = () => {
    setToken(null);
    setCustomer(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  };

  return (
    <div className="App">
      <Header customer={customer} logout={logout} />
      <main className={styles.main}>{startPage}</main>
    </div>
  );
}

export default App;
