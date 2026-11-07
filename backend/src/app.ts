import express, { type Express, type Request, type Response } from "express";

import health from "./routes/health.routes.ts";

export const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.use("/api/v1", health);
