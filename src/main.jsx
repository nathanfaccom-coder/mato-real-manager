import React from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { App } from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <React.Suspense
      fallback={
        <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
          Carregando...
        </div>
      }
    >
      <App />
    </React.Suspense>
  </ErrorBoundary>,
);
