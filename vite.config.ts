import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import urlParse from "url-parse";
import path from "path-browserify";

const __filename = urlParse(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "src/components"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/navigation": path.resolve(__dirname, "src/navigation"),
      "@/assets": path.resolve(__dirname, "src/assets"),
    },
  },
});
