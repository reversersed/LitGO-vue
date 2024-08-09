import type Author from "@/models/author.model";
import GenericHttpService from "@/service/HttpService/genericHttpService";
import axios from "axios";

export default class AuthorsHttpService extends GenericHttpService<Author> {
	constructor() {
		super("/authors");
	}

	async getSuggestion(query: string): Promise<Author[]> {
		try {
			let response = await axios.get(this.buildPath("/suggest?query=" + query));
			return (await response.data.authors) as Promise<Author[]>;
		} catch {
			return [];
		}
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
