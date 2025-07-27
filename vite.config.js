import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 6999,
    // proxy: {
    //   "/api": {
    //     // target means backend server
    //     target: "http://localhost:7000",
    //   },
    //   //add more shortcuts/proxy prefixes if needed
    // },
  },
});
