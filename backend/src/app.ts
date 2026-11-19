import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth, type AuthenticatedUser } from "./lib/auth.ts";
import { authenticateHandler } from "./middleware/authenticateHandler.ts";
import { config } from "./utils/config.ts";
import { notFoundHandler } from "./middleware/errors/notFound.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import health from "./routes/health.routes.ts";
import foods from "./routes/foods.routes.ts";

export const app: Express = express();

// Configure CORS middleware
app.use(
	cors({
		origin: `${config.SERVER_ORIGIN}${config.PORT}`, // Replace with your frontend's origin
		methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
		credentials: true, // Allow credentials (cookies, authorization headers, etc.)
	}),
);

// setup better Auth
app.all(`${config.API_PREFIX}/auth/*splat`, toNodeHandler(auth));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("API is under: /api/v1/");
});

app.get(config.API_PREFIX, (req: Request, res: Response) => {
	res.send("Hello World!");
});

// middleware test
// TODO: move it to /users/me
app.get(
	`${config.API_PREFIX}/home`,
	authenticateHandler,
	async (req: Request, res: Response) => {
		const user = res.locals.user as AuthenticatedUser;
		const userName = user.name;
		const greeting = `Hello ${userName}!`;
		// res.send(greeting);
		res.status(200).json({ success: true, data: { greeting } });
	},
);

app.get("/test-error", (req, res, next) => {
	next(new Error("Test internal error"));
});

app.use(config.API_PREFIX, health);
app.use(config.API_PREFIX, foods);

app.use(notFoundHandler);
app.use(errorHandler);
