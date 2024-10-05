import { createRouter, createWebHistory } from "vue-router";
import loadLayoutMiddleware from "./middleware/layoutMiddleware";
import identityMiddleware from "./middleware/identityMiddleware";
import { AppLayoutEnum } from "@/layouts/layouts.enum";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: async () => await import("@/pages/MainPage.vue"),
		},
		{
			path: "/genres",
			name: "genres",
			component: async () => await import("@/pages/GenreObserverPage.vue"),
		},
		{
			path: "/login",
			name: "login",
			component: async () => await import("@/pages/LoginPage.vue"),
			meta: {
				authorized: false,
				layout: AppLayoutEnum.login,
			},
		},
		{
			path: "/signin",
			name: "signin",
			component: async () => await import("@/pages/SignInPage.vue"),
			meta: {
				authorized: false,
				layout: AppLayoutEnum.login,
			},
		},
		{
			path: "/notfound",
			component: async () => await import("@/pages/NotFoundPage.vue"),
			meta: {
				layout: AppLayoutEnum.notfound,
			},
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: "/notfound",
		},
	],
});
router.beforeEach(loadLayoutMiddleware);
router.beforeEach(identityMiddleware);

export default router;
