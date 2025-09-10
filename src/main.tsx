import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize/modern-normalize.css";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
