import Category from "@/models/category.model";
import GenericHttpService from "./genericHttpService";
import axios from "axios";

export default class BooksHttpService extends GenericHttpService<Category> {
	constructor() {
		super("/genres");
	}

	async getAll(): Promise<Category[]> {
		const response = await axios.get(this.buildPath("/all"));
		return await (response.data as Promise<Category[]>);
	}
	get(translitName: string): Promise<Category> {
		throw new Error("Method not implemented.");
	}
	create(entity: Category): Promise<string> {
		throw new Error("Method not implemented.");
	}
	update(entity: Category): Promise<string> {
		throw new Error("Method not implemented.");
	}
	delete(translitName: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
