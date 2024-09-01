import type Book from "@/models/book.model";
import GenericHttpService from "./genericHttpService";



export default class BookHttpService extends GenericHttpService<Book>{
    constructor() {
        super("");
    }

    getAll(): Promise<Book[]> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<Book> {
        throw new Error("Method not implemented.");
    }
    create(entity: Book): Promise<string> {
        throw new Error("Method not implemented.");
    }
    update(entity: Book): Promise<string> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}