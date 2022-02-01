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

function App() {
  const LOCAL_STORAGE_TOKEN_NAME = "token";
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadMyPost, setIsReadMyPost] = useState(false);

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
    setIsReadMyPost(false);
  }, [postWebService]);

  const readMyPost = () => {
    const filteredPosts = posts.filter(
      (post) => customer?.entity_id === post.customer_id
    );
    setPosts(filteredPosts);
    setIsReadMyPost(true);
  };

  const updatePost = (post: Post) => {
    postWebService.update(post);
  };

  const deletePost = (post: Post) => {
    postWebService.delete(post);
  };

  const login = useCallback(
    (token: string) => {
      if (!token) return;
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      authWebService
        .me()
        .then((customer) => {
          setCustomer(customer);
        })
        .finally(() => {
          setIsLoading(false);
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
      setIsLoading(true);
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
      setPosts={setPosts}
      isReadMyPost={isReadMyPost}
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
      <main className={styles.main}>{isLoading ? "" : startPage}</main>
    </div>
  );
}

export default App;
