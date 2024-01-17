// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
	build: {
		manifest: true,
		outDir: "public",
		assetsDir: "assets",
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
			},
		},
	},
	plugins: [react()],
	test: {
		globals: true,
		environment: "happy-dom",
		include: ["./src/__tests__/**"],
		exclude: ["./src/__tests__/setup.ts"],
		setupFiles: "./src/__tests__/setup.ts",
		reporters: "verbose",
	},
	server: {
		host: "localhost",
		port: 3000,
		strictPort: true,
		proxy: {
			"*": {
				target: "http://localhost:8000",
				changeOrigin: true,
				ws: true,
			},
		},
	},
	assetsInclude: ["**/*.md", "**/*.mdx"],
	resolve: {
		alias: {
			"@": resolve(__dirname, "resources/js"),
			"@lesson": resolve(__dirname, "src/lessons"),
		},
	},
});
