import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/stylesheets/index.css";

import App from "./App/App";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
);
