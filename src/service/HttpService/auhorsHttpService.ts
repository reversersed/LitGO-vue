import type Author from "@/models/author.model";
import GenericHttpService from "@/service/HttpService/genericHttpService";

export default class AuthorsHttpService extends GenericHttpService<Author>{
    constructor(){
        super("/authors")
    }

    getSuggestion(query: string) : Promise<Author[]>{
        throw new Error("Methor not implemented.")
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