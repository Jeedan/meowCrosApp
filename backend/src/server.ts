import "dotenv/config";
import { app } from "./app.ts";
import { config } from "./utils/config.ts";
import { checkDatabaseConnection } from "./db/index.ts";

const PORT = Number(config.PORT);
const server = config.SERVER_ORIGIN;

try {
	await checkDatabaseConnection();
	//0.0.0.0
	app.listen(PORT, "0.0.0.0", () => {
		//console.log(`Server running on ${server}${PORT}`);
		console.log(`Server running on ${PORT}`);
	});
} catch (err) {
	console.error("Failed to connect to database:", err);
	process.exit(1);
}
