import router from "@/router";
import { inject, type App } from "vue";
import type { Router } from "vue-router";

export const routerProvidePlugin = {
	install(app: App<Element>) {
		app.provide<Router>("router", router);
	},
};
export default function useRouter() {
	return inject<Router>("router");
}
