import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("@/pages/MainPage.vue"),
		},
		{
			path: "/genres",
			name: "genres",
			component: () => import("@/pages/GenreObserverPage.vue"),
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: "/", // 404 redirecting to index
		},
	],
});

export default router;
