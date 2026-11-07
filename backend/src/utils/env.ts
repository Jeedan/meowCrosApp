export const NODE_ENV = validateEnv(process.env.NODE_ENV);

export const PORT = validatePort(process.env.PORT);

function validateEnv(input: string = "development") {
	if (input === "development") {
		console.log("Environment set to:", input);
		return input;
	}

	if (input === "production") {
		console.log("Environment set to:", input);
		return input;
	}

	if (input === "test") {
		console.log("Environment set to:", input);
		return input;
	}

	throw new Error("NODE_ENV must be development, production, or test");
}

function validatePort(input: string = "3000") {
	const port = Number(input);
	const isNum = Number.isInteger(port);
	if (!isNum) throw new Error("invalid PORT");

	if (port >= 1 && port <= 65535) {
		return port;
	}

	throw new Error("PORT must be an integer between 1 and 65535");
}
