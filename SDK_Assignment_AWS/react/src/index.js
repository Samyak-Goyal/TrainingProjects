import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import crudStore from "./Store/Store";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <Provider store={crudStore}>
            <App />
        </Provider>
    </BrowserRouter>
);