import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TRPCProvider from "./trpc.tsx";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <TRPCProvider>
        <Header />
        <App />
      </TRPCProvider>
    </BrowserRouter>
  </React.StrictMode>
);
