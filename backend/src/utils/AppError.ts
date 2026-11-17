export default class AppError extends Error {
	public statusCode: number;
	public code: string;

	constructor(statusCode: number, code: string, message: string) {
		super(message);
		this.statusCode = statusCode;
		this.code = code;
		this.name = "AppError";
	}
}

export class BadRequestError extends AppError {
	constructor(message = "Bad Request") {
		super(400, "BAD_REQUEST", message);
	}
}

export class ValidationError extends AppError {
	constructor(message = "Validation Error") {
		super(400, "VALIDATION_ERROR", message);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(401, "UNAUTHORIZED", message);
	}
}

export class ForbiddenError extends AppError {
	constructor(message = "Forbidden") {
		super(403, "FORBIDDEN", message);
	}
}

export class NotFoundError extends AppError {
	constructor(message = "Not Found") {
		super(404, "NOT_FOUND", message);
	}
}

export class ConflictError extends AppError {
	constructor(message = "Conflict") {
		super(409, "CONFLICT", message);
	}
}
