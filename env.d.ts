/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SERVER_STRING: string;
	readonly VITE_SERVER_PORT: number;
	readonly VITE_SERVER_ENTRY_POINT: string;
	readonly VITE_SERVER_CONTENT_TYPE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
