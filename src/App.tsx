import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
