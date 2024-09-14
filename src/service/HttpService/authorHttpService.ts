import type Author from "@/models/author.model";
import GenericHttpService from "@/service/HttpService/genericHttpService";

export default class AuthorHttpService extends GenericHttpService<Author> {
	constructor() {
		super("/authors");
	}

	async getSuggestion(query: string): Promise<Author[]> {
		let response = await this.axios
			.get(this.buildPath("/suggest?query=" + query))
			.then((response) => response.data as Promise<Author[]>)
			.catch((error) => []);
		return response;
	}
	getAll(): Promise<Author[]> {
		throw new Error("Method not implemented.");
	}
	get(id: string): Promise<Author> {
		throw new Error("Method not implemented.");
	}
	create(entity: Author): Promise<string> {
		throw new Error("Method not implemented.");
	}
	update(entity: Author): Promise<string> {
		throw new Error("Method not implemented.");
	}
	delete(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
