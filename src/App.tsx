import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/header/header";
import Customer from "./interfaces/Customer";
import Login from "./pages/Login";
import Main from "./pages/Main";
import AuthWebService from "./services/AuthWebService";
import axios from "axios";
import CustomerWebService from "./services/CustomerWebService";
import styles from "./App.module.css";
import PostWebService from "./services/PostWebService";
import Post from "./interfaces/Post";
import { io } from "socket.io-client";

function App() {
  const LOCAL_STORAGE_TOKEN_NAME = "token";
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

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

  const addPost = (postText: string) => {
    postWebService.create(postText);
  };

  const readAllPost = useCallback(async () => {
    const posts = await postWebService.readAll();
    setPosts(posts);
  }, [postWebService]);

  const readMyPost = () => {
    const filteredPosts = posts.filter(
      (post) => customer?.entity_id === post.customer_id
    );
    setPosts(filteredPosts);
  };

  const updatePost = (post: Post) => {
    postWebService.update(post);
  };

  const deletePost = (post: Post) => {
    postWebService.delete(post);
  };

  const startSocket = useCallback(() => {
    const socket = io("ws://localhost:3000");
    socket.on("changed_post", (changedPost: Post[]) => {
      console.log(changedPost);
      setPosts(changedPost);
    });
  }, []);

  const login = useCallback(
    (token: string) => {
      if (!token) return;
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      authWebService.me().then((customer) => {
        setCustomer(customer);
      });
    },
    [authWebService, http.defaults.headers.common]
  );

  const logout = () => {
    http.defaults.headers.common["Authorization"] = "";
    setCustomer(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  };

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_TOKEN_NAME
    );
    if (tokenFromLocalStorage) {
      login(tokenFromLocalStorage);
    }
  }, [login]);

  const startPage = customer ? (
    <Main
      customer={customer}
      posts={posts}
      addPost={addPost}
      readAllPost={readAllPost}
      updatePost={updatePost}
      deletePost={deletePost}
      startSocket={startSocket}
    />
  ) : (
    <Login
      authService={authWebService}
      customerService={customerWebService}
      login={login}
    />
  );

  return (
    <div className="App">
      <Header
        customer={customer}
        logout={logout}
        readMyPost={readMyPost}
        readAllPost={readAllPost}
      />
      <main className={styles.main}>{startPage}</main>
    </div>
  );
}

export default App;
