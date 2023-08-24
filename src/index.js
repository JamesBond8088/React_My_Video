import React from "react";
// import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { FavourateContextProvider } from "./store/favourate-context"

const root = createRoot(document.getElementById("root"));
root.render(
  <FavourateContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavourateContextProvider>
);
