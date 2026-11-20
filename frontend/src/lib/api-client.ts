import { authClient } from "./auth-client";

// GET /api/v1/foods — retrieve foods.
// POST /api/v1/foods — create a food, requiring a JSON request body.
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiResponse<T> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			error: {
				code: string;
				message: string;
			};
	  };

export async function apiRequest<T>(
	endpoint: string,
	method: HttpMethod,
	body?: unknown,
): Promise<T> {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	try {
		const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;
		if (!baseURL)
			throw new Error("EXPO_PUBLIC_API_BASE_URL is not configured");

		const url = new URL(endpoint, baseURL);

		// timeout controller
		const controller = new AbortController();

		const cookies = await authClient.getCookie();
		// build request object to pass to fetch request
		// if body exists we add the necessary content-type header
		// as well as append the body itself
		const reqOptions: RequestInit = {
			method: method,
			headers: {
				Cookie: cookies ?? "",
				...(body !== undefined && {
					"Content-Type": "application/json",
				}),
			},
			credentials: "omit",
			...(body !== undefined && {
				body: JSON.stringify(body),
			}),
			signal: controller.signal,
		};

		timeout = setTimeout(() => {
			controller.abort();
		}, 10_000);
		const response = await fetch(url, reqOptions);

		const data: ApiResponse<T> = await response.json();
		if (!response.ok || !data.success) {
			throw new Error(
				data.success
					? `Request failed with status: ${response.status}`
					: data.error?.message,
			);
		}

		return data.data;
	} catch (err) {
		if (err instanceof Error && err.name === "AbortError") {
			throw new Error("Request timed out. Please try again.");
		}
		throw err;
	} finally {
		clearTimeout(timeout);
	}
}
