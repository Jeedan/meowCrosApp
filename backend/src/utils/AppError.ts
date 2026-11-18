export default class AppError extends Error {
	public statusCode: number;
	public code: string;
	public details?: unknown;

	constructor(
		statusCode: number,
		code: string,
		message: string,
		details?: unknown,
	) {
		super(message);
		this.statusCode = statusCode;
		this.code = code;
		this.name = "AppError";
		this.details = details;
	}
}

export class BadRequestError extends AppError {
	constructor(message = "Bad Request") {
		super(400, "BAD_REQUEST", message);
	}
}

export class ValidationError extends AppError {
	constructor(message = "Validation Error", details?: unknown) {
		super(400, "VALIDATION_ERROR", message, details);
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
