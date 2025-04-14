import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // ✅ Import this
import { store } from "./store/store";
import App from "./App";
import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter> {/* ✅ Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </Provider>
);
