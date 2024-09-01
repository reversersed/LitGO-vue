import type User from "@/models/user.model";
import GenericHttpService from "./genericHttpService";
import type { UserLoginModel } from "@/models/user.model";
import axios from "axios";

export default class UserHttpService extends GenericHttpService<User> {
	constructor() {
		super("/users");
	}

	async checkForAuthorization(): Promise<UserLoginModel | undefined> {
		try {
			const response = await axios.get(this.buildPath("/auth"));

			return (await response.data) as Promise<UserLoginModel>;
		} catch {
			return undefined;
		}
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
