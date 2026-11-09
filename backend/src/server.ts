import "dotenv/config";
import { app } from "./app.ts";
import { config } from "./utils/config.ts";
import { checkDatabaseConnection } from "./db/index.ts";

const PORT = config.PORT;

try {
	await checkDatabaseConnection();
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
} catch (err) {
	console.error("Failed to connect to database:", err);
	process.exit(1);
}
