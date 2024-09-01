import { inject, reactive, type App } from "vue";
import UserHttpService from "../HttpService/userHttpService";
import type { UserLoginModel } from "@/models/user.model";

interface userStateProps {
	id: string;
	login: string;
	roles: string[];
	isAuthorized: boolean;
}
const userState = reactive<userStateProps>({
	id: "",
	login: "Гость",
	roles: ["guest"],
	isAuthorized: false,
});
export const userStatePlugin = {
	async install(app: App<Element>) {
		let user = await new UserHttpService().checkForAuthorization();
		user !== undefined && OnUserLogin(user);

		app.provide<userStateProps>("userState", userState);
	},
};
export function useUser() {
	return inject<userStateProps>("userState");
}
export function OnUserLogin(model: UserLoginModel) {
	userState.id = model.id;
	userState.login = model.login;
	userState.roles = model.roles;
	userState.isAuthorized = true;
}
