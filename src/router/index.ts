import { useUser } from "@/service/plugins/userStatePlugin";
import { createRouter, createWebHistory } from "vue-router";

const unauthorizedRoute = (): string | void => {
	let state = useUser();
	if (state === undefined || state.isAuthorized) return "/";
};
const authorizedRoute = (): string | void => {
	let state = useUser();
	if (state === undefined || !state.isAuthorized) return "/login";
};

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
			path: "/login",
			name: "login",
			beforeEnter: unauthorizedRoute,
			component: () => import("@/pages/LoginPage.vue"),
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: "/", // 404 redirecting to index
		},
	],
});

export default router;
