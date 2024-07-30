import serverConfig from "@/config/server.config";
import type { IHttpService } from "./httpService";



export default abstract class GenericHttpService<T> implements IHttpService<T>{
    private serverString: string;
    private controllerName: string;

    constructor(controllerName: string) {
        this.serverString = `https://${serverConfig.serverString}:${serverConfig.serverPort}/${serverConfig.serverEntryPoint}`;
        this.controllerName = controllerName;
    }


    protected buildPath(pathPart?: string): string {
        return "";
    }

    abstract getAll(): Promise<T[]>;
    abstract get(id: string): Promise<T>;
    abstract create(entity: T): Promise<string>;
    abstract update(entity: T): Promise<string>;
    abstract delete(id: string): Promise<void>;
}