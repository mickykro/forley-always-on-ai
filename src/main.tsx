import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Signal to prerenderer that the app has rendered
// This event is listened to by @prerenderer/renderer-jsdom during build
if (typeof document !== "undefined") {
  document.dispatchEvent(new Event("app-rendered"));
}
