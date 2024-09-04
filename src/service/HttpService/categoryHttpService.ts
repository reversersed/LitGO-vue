import Category from "@/models/category.model";
import GenericHttpService from "./genericHttpService";

export default class CategoryHttpService extends GenericHttpService<Category> {
	constructor() {
		super("/genres");
	}

	async getAll(): Promise<Category[]> {
		const response = await this.axios
			.get(this.buildPath("/all"))
			.then((response) => response.data as Promise<Category[]>)
			.catch((error) => []);

		return response;
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
