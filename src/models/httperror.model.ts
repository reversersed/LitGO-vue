interface HttpErrorDetail {
	field: string | undefined;
	struct: string | undefined;
	tag: string | undefined;
	description: string | undefined;
	actualvalue: string | undefined;
}
export default interface HttpError {
	details: HttpErrorDetail[];
	code: number;
	message: string;
	type: string;
}
export function isHttpError(object: any): boolean {
	return (object as HttpError).details !== undefined;
}
