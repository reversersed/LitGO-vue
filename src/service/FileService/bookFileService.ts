import GenericFileService from "./genericFileService";

export default class BookFileService extends GenericFileService {
	constructor() {
		super();
	}

	public getBookPath(filename: string): string {
		return this.getPath("books", filename);
	}
	public getBookCoverPath(filename: string): string {
		return this.getPath("book_covers", filename);
	}
}
