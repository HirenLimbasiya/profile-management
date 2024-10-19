import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { GlobalProvider } from "./context/GlobalContext";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <AppRoutes />
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default App;
