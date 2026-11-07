import "dotenv/config";
import { app } from "./app.ts";
import { PORT } from "./utils/env.ts";

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
