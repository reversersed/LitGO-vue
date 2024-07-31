import serverConfig from "@/config/server.config";
import type { IHttpService } from "./httpService";

export default abstract class GenericHttpService<T> implements IHttpService<T> {
	private serverString: string;
	private controllerName: string;

	constructor(controllerName: string) {
		this.serverString = `${serverConfig.serverString}:${serverConfig.serverPort}/${serverConfig.serverEntryPoint}`;
		controllerName =
			controllerName[0] === "/" ? controllerName.slice(1) : controllerName;
		controllerName =
			controllerName[controllerName.length - 1] === "/"
				? controllerName.slice(0, controllerName.length - 1)
				: controllerName;
		this.controllerName = controllerName;
	}

	protected buildPath(pathPart?: string): string {
		return (
			this.serverString +
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
