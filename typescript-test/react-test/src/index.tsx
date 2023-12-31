import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginComponent from "./LoginComponent";
import LoginService from "./services/LoginService";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const loginService = new LoginService();
const setToken = (token: string) => {
  console.log(`Token is ${token}`);
};
root.render(<LoginComponent loginService={loginService} setToken={setToken} />);
