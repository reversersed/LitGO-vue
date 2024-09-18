export default class Genre {
	public translitname: string;
	public name: string;
	public bookcount: number;

	constructor(_translitName: string, _name: string, _bookCount: number) {
		this.translitname = _translitName;
		this.name = _name;
		this.bookcount = _bookCount;
	}
}
