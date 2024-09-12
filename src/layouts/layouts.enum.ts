export enum AppLayoutEnum {
	default = "default",
	login = "login",
}

export const AppLayoutFileMap: Record<AppLayoutEnum, string> = {
	default: "DefaultLayout.vue",
	login: "LoginLayout.vue",
};
