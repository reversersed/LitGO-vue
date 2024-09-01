import { inject, reactive, type App } from "vue";

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
	install(app: App<Element>) {
		app.provide<userStateProps>("userState", userState);
	},
};
export function useUser() {
	return inject<userStateProps>("userState");
}
