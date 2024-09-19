import type Author from "./author.model";
import type Category from "./category.model";
import type Genre from "./genre.models";

export default class Book {
	public id: string;
	public name: string;
	public translitname: string;
	public description: string;
	public picture: string;
	public filepath: string;
	public genre: Genre;
	public category: Category;
	public authors: Author[];

	constructor(
		_id: string,
		_name: string,
		_translitname: string,
		_description: string,
		_picture: string,
		_filepath: string,
		_genre: Genre,
		_category: Category,
		_authors: Author[]
	) {
		this.id = _id;
		this.name = _name;
		this.translitname = _translitname;
		this.description = _description;
		this.picture = _picture;
		this.filepath = _filepath;
		this.genre = _genre;
		this.category = _category;
		this.authors = _authors;
	}
}
