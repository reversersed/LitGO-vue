import type Author from "./author.model";
import type Genre from "./genre.models";

export default class Book {
	public id: string;
	public name: string;
	public pages: number;
	public year: number;
	public author: Author;
	public cover: string;
	public fileURL: string;
	public genres: Genre[];

	constructor(
		_id: string,
		_name: string,
		_pages: number,
		_year: number,
		_author: Author,
		_cover: string,
		_file: string,
		_genres: Genre[]
	) {
		this.id = _id;
		this.name = _name;
		this.pages = _pages;
		this.year = _year;
		this.cover = _cover;
		this.fileURL = _file;
		this.author = _author;
		this.genres = _genres;
	}
}
