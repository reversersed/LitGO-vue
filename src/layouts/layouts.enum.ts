export enum AppLayoutEnum {
	default = "default",
	login = "login",
	notfound = "notfound",
}

export const AppLayoutFileMap: Record<AppLayoutEnum, string> = {
	default: "DefaultLayout.vue",
	login: "LoginLayout.vue",
	notfound: "NotFoundLayout.vue",
};
