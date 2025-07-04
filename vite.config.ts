import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number(env.PORT) || 4000;

  console.log(`🚀 Starting server on port: ${port}`);

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: port,
      host: true,
      open: true,
    },
  };
});
