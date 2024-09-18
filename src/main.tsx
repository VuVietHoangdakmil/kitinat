import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "normalize.css";
import { InfoProvider } from "./components/provider/InfoProvider";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InfoProvider>
      <App />
    </InfoProvider>
  </StrictMode>
);
