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
import axiosRetry from "axios-retry";

function App() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadMyPost, setIsReadMyPost] = useState(false);

  const http = useMemo(() => {
    const http = axios.create({
      baseURL: process.env.REACT_APP_WEB_SERVICE_BASEURL,
      withCredentials: true,
    });
    axiosRetry(http, {
      retries: 5,
      retryDelay: (retry) => {
        const delay = Math.pow(2, retry) * 100;
        const jitter = delay * 0.1 * Math.random();
        return delay + jitter;
      },
      retryCondition: (err) =>
        axiosRetry.isNetworkOrIdempotentRequestError(err) ||
        err.response?.status === 429,
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
      (post) => customer?.entity_id === post.customer_entity_id
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

  const login = useCallback(() => {
    authWebService
      .me()
      .then((customer) => {
        setCustomer(customer);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authWebService]);

  const logout = useCallback(() => {
    // todo: ????????? ???????????? ??????
    authWebService.logout().then((e) => console.log(e));
    setCustomer(null);
  }, [authWebService]);

  useEffect(() => {
    if (document.cookie.includes("token_expire")) {
      setIsLoading(true);
      login();
    }
  }, [login]);

  useEffect(() => {
    authWebService
      .csrfToken()
      .then((csrfToken) => {
        console.log(csrfToken);
        if (typeof csrfToken !== "string") {
          throw new Error();
        }
        http.defaults.headers.common["yktwitter-csrf-token"] = csrfToken;
      })
      .catch(console.error);
  });

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
