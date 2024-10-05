import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		VitePWA({
			registerType: "autoUpdate",
			devOptions: { enabled: true },
			manifest: {
				id: "litgo-application",
				name: "LitGO",
				short_name: "LitGO",
				start_url: "/",
				display: "standalone",
				theme_color: "#ffffff",
				lang: "ru",
				icons: [
					{
						src: "./named-icon.png",
						sizes: "348x348",
						type: "image/png",
						purpose: "any",
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		port: 7000,
	},
	envDir: "src/config",
});
