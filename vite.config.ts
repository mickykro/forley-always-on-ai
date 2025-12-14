import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      prerender({
        routes: ["/", "/contact", "/faq", "/privacy", "/delete"],
        renderer: "@prerenderer/renderer-jsdom",
        rendererOptions: {
          renderAfterDocumentEvent: "app-rendered",
        },
        postProcess(renderedRoute) {
          // Ensure proper encoding for Hebrew content
          renderedRoute.html = renderedRoute.html.replace(
            /<html/,
            '<html lang="he" dir="rtl"'
          );
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
