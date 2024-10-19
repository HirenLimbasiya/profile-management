import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { GlobalProvider } from "./context/GlobalContext";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <GlobalProvider>
          <AppRoutes />
        </GlobalProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
