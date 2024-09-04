import { inject, reactive, type App } from "vue";
import type { UserLoginModel } from "@/models/user.model";
import { deepAssign } from "./deepAssign";

interface userStateProps {
	login: string;
	roles: string[];
	isAuthorized: boolean;
}
const userState = reactive<userStateProps>({
	login: "Гость",
	roles: ["guest"],
	isAuthorized: false,
});
export const userStatePlugin = {
	install(app: App<Element>) {
		app.provide<userStateProps>("userState", userState);
	},
};
export function useUser() {
	return inject<userStateProps>("userState");
}
export function OnUserLogin(model: UserLoginModel) {
	deepAssign(userState, {
		login: model.login,
		roles: model.roles,
		isAuthorized: true,
	});
}
