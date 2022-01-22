import React, { useState } from "react";
import Header from "./components/header/header";
import Customer from "./interfaces/Customer";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  const [customer, setCustomer] = useState<Customer | null>(null);

  // todo: localStorage에서 토큰 가지고 있다면 로그인 된 상태로 가게 하는 처리

  const startPage = customer ? (
    <Login setCustomer={setCustomer} />
  ) : (
    <Main customer={customer} />
  );
  const logout = () => {};

  return (
    <div className="App">
      <Header customer={customer} logout={logout} />
      {startPage}
    </div>
  );
}

export default App;
