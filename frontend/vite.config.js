import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Import path for alias configuration

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
