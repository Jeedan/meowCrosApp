import type { Request, Response } from "express";

export function getHealth(req: Request, res: Response) {
	return res.status(200).json({ success: true, data: {} });
}
