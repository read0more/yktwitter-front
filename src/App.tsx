import React from "react";
import Header from "./components/header/header";

function App() {
  return (
    <div className="App">
      <Header customer={{ id: "111" }} />
    </div>
  );
}

export default App;
