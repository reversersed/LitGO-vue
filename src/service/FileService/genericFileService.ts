export default abstract class GenericFileService {
	private generalSourcePath: string;

	constructor() {
		this.generalSourcePath = "files";
		this.generalSourcePath =
			this.generalSourcePath[this.generalSourcePath.length - 1] === "/"
				? this.generalSourcePath.slice(0, this.generalSourcePath.length - 1)
				: this.generalSourcePath;
	}
	protected getPath(path: string, filename: string): string {
		return this.generalSourcePath + "/" + path + "/" + filename;
	}
}
