import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { URL } from "url";
import path from "path-browserify";

const currentUrl = new URL(import.meta.url);
const __filename = currentUrl.pathname;
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "src/components"),
      // "@/context": path.resolve(__dirname, "src/context"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/navigation": path.resolve(__dirname, "src/navigation"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
