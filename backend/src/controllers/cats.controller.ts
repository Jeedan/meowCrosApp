import type { Request, Response } from "express";

// Test	Expected result
// GET existing cat	Returns profile
// GET nonexistent cat	404
// POST first cat	Returns created profile
// POST second cat	409
// PATCH name only	Other fields unchanged
// PATCH weight	Weight updated
// PATCH override to null	Override cleared
// PATCH override to a number	Override updated
// PATCH another user's cat ID	404
// PATCH nonexistent cat ID	404

export async function handlerGetCats(req: Request, res: Response) {
  
}

export async function handlerCreateCat(req: Request, res: Response) {}

export async function handlerUpdateCat(req: Request, res: Response) {}
