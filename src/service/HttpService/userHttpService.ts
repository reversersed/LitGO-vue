import type User from "@/models/user.model";
import GenericHttpService from "./genericHttpService";
import type { UserLoginModel } from "@/models/user.model";
import type HttpError from "@/models/httperror.model";
import { createNullError } from "@/models/httperror.model";

export default class UserHttpService extends GenericHttpService<User> {
	constructor() {
		super("/users");
	}

	async checkForAuthorization(): Promise<UserLoginModel | undefined> {
		const response = await this.axios
			.get(this.buildPath("/auth"))
			.then((response) => response.data as Promise<UserLoginModel>)
			.catch((error) => undefined);

		return response;
	}
	async login(
		login: string,
		password: string
	): Promise<UserLoginModel | HttpError> {
		const response = await this.axios
			.post(this.buildPath("/login"), { login: login, password: password })
			.then((response) => response.data as Promise<UserLoginModel>)
			.catch((error) => {
				if (error.response !== undefined)
					return error.response.data as Promise<HttpError>;
				else return createNullError();
			});
		return response;
	}
	getAll(): Promise<User[]> {
		throw new Error("Method not implemented.");
	}
	get(id: string): Promise<User> {
		throw new Error("Method not implemented.");
	}
	create(entity: User): Promise<string> {
		throw new Error("Method not implemented.");
	}
	update(entity: User): Promise<string> {
		throw new Error("Method not implemented.");
	}
	delete(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
