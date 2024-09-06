import type { AppLayoutEnum } from "@/layouts/layouts.enum";
import type { UserRoles } from "@/models/user.model";
import type { VueElement } from "vue";

declare module "vue-router" {
	interface RouteMeta {
		layout?: AppLayoutEnum;
		layoutComponent?: VueElement;
		authorized?: boolean;
		roles?: UserRoles[];
	}
}
