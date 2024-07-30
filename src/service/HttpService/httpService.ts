

export interface IHttpService<T> {
    getAll(): Promise<Array<T>>;
    get(id: string): Promise<T>;
    create(entity: T): Promise<string>;
    update(entity: T): Promise<string>;
    delete(id: string): Promise<void>;
}