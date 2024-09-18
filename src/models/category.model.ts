import type Genre from "./genre.models";

export default class Category {
	public translitname: string;
	public name: string;
	public genres: Genre[];

	constructor(_translitName: string, _name: string, _genres: Genre[]) {
		this.translitname = _translitName;
		this.name = _name;
		this.genres = _genres;
	}
}
