type APIConfig = {
	NODE_ENV: string;
	PORT: string;
	SERVER_ORIGIN: string;
	API_PREFIX: string;
	db: DBConfig;
};

type DBConfig = {
	url: string;
};

function envOrThrow(key: string) {
	const value = process.env[key];
	if (!value || value.length === 0) {
		throw new Error(`Environtment variable ${key} is not set`);
	}

	return value;
}

const dbConfig: DBConfig = {
	url: envOrThrow("DATABASE_URL"),
};

export const config: APIConfig = {
	NODE_ENV: envOrThrow("NODE_ENV"),
	PORT: envOrThrow("PORT"),
	SERVER_ORIGIN: envOrThrow("SERVER_ORIGIN"),
	API_PREFIX: envOrThrow("API_PREFIX"),
	db: dbConfig,
};
