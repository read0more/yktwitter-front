import React, { useState } from "react";
import Header from "./components/header/header";
import Customer from "./interfaces/Customer";

function App() {
  const [customer, setCustomer] = useState<Customer | null>(null);

  // todo: localStorage에서 토큰 가지고 있다면 로그인 된 상태로 가게 하는 처리
  return (
    <div className="App">
      <Header customer={customer} />
    </div>
  );
}

export default App;
