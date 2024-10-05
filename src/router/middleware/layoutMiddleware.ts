import { AppLayoutEnum, AppLayoutFileMap } from "@/layouts/layouts.enum";
import { defineAsyncComponent } from "vue";
import type { RouteLocationNormalized } from "vue-router";

export default function loadLayoutMiddleware(route: RouteLocationNormalized) {
	const { layout } = route.meta;
	const normalizedLayoutName = layout || AppLayoutEnum.default;
	const layoutFileName =
		AppLayoutFileMap[normalizedLayoutName].split(".vue")[0];

	route.meta.layoutComponent = defineAsyncComponent(
		() => import(`@/layouts/${layoutFileName}.vue`)
	);
}
