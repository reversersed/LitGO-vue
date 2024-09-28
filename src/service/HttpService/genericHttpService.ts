import serverConfig from "@/config/server.config";
import type { IHttpService } from "./httpService";
import axios, { Axios } from "axios";

export default abstract class GenericHttpService<T> implements IHttpService<T> {
	private serverString: string;
	private controllerName: string;
	protected axios: Axios;

	constructor(controllerName: string) {
		this.serverString = `${serverConfig.serverString}:${serverConfig.serverPort}/${serverConfig.serverEntryPoint}`;
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
			"Content-Type": serverConfig.serverContentType,
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
