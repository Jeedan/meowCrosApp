import express, { type Express, type Request, type Response } from "express";
import health from "./routes/health.routes.ts";
import { notFoundHandler } from "./middleware/errors/notFound.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

import cors from "cors";

import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth.ts";
import { config } from "./utils/config.ts";

export const app: Express = express();

// Configure CORS middleware
// app.use(
// 	cors({
// 		origin: config.BASE_URL, // Replace with your frontend's origin
// 		methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
// 		credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// 	}),
// );

// setup better Auth
app.all(`${config.API_PREFIX}/auth/*splat`, toNodeHandler(auth));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("API is under: /api/v1/");
});

app.get(config.API_PREFIX, (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.get("/test-error", (req, res, next) => {
	next(new Error("Test internal error"));
});

app.use(config.API_PREFIX, health);

app.use(notFoundHandler);
app.use(errorHandler);
