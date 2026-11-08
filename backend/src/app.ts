import express, { type Express, type Request, type Response } from "express";

import health from "./routes/health.routes.ts";
import { notFoundHandler } from "./middleware/errors/notFound.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

export const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.get("/test-error", (req, res, next) => {
	next(new Error("Test internal error"));
});

app.use("/api/v1", health);

app.use(notFoundHandler);
app.use(errorHandler);
