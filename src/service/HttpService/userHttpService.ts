import type User from "@/models/user.model";
import GenericHttpService from "./genericHttpService";

export default class UserHttpService extends GenericHttpService<User> {
	constructor() {
		super("/users");
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
