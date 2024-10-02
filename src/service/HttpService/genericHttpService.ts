import type { IHttpService } from "./httpService";
import axios, { Axios } from "axios";

export default abstract class GenericHttpService<T> implements IHttpService<T> {
	private controllerName: string;
	private serverString: string;
	protected axios: Axios;

	constructor(controllerName: string) {
		this.serverString = `${import.meta.env.VITE_SERVER_STRING}:${
			import.meta.env.VITE_SERVER_PORT
		}/${import.meta.env.VITE_SERVER_ENTRY_POINT}`;
		controllerName =
			controllerName[0] === "/" ? controllerName.slice(1) : controllerName;
		controllerName =
			controllerName[controllerName.length - 1] === "/"
				? controllerName.slice(0, controllerName.length - 1)
				: controllerName;
		this.controllerName = controllerName;
		this.axios = axios.create({
			baseURL: this.serverString,
			headers: this.getDefaultHeaders(),
			withCredentials: true,
		});
	}
	private getDefaultHeaders() {
		return {
			"Content-Type": import.meta.env.VITE_SERVER_CONTENT_TYPE,
			"Access-Control-Expose-Headers": ["Cookie", "Set-Cookie"],
		};
	}
	protected buildPath(pathPart?: string): string {
		return (
			this.controllerName +
			(pathPart &&
				(pathPart[0] === "/" || pathPart[0] === "?"
					? pathPart
					: "/" + pathPart))
		);
	}
	abstract getAll(): Promise<T[]>;
	abstract get(id: string): Promise<T>;
	abstract create(entity: T): Promise<string>;
	abstract update(entity: T): Promise<string>;
	abstract delete(id: string): Promise<void>;
}
