import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Signal to prerenderer that the app has rendered
// Use setTimeout to ensure React has completed its initial render cycle
// This is critical for JSDOM renderer to capture the full rendered content
if (typeof document !== "undefined") {
  setTimeout(() => {
    document.dispatchEvent(new Event("app-rendered"));
  }, 500);
}
