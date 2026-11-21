import { apiRequest } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { endpoints, queryKeys } from "@/utils/constants";
import { FoodResponse } from "@shared/index";
import { useQuery } from "@tanstack/react-query";

async function getFoods() {
	const response = await apiRequest<FoodResponse[]>(endpoints.foods, "GET");
	return response;
}

export default function useFoods() {
	const { data: session, isPending: isSessionPending } =
		authClient.useSession();
	const userId = session?.user.id;
	const query = useQuery({
		queryKey: [queryKeys.foods, userId],
		queryFn: getFoods,
		enabled: !!userId,
	});

	return {
		foods: userId ? (query.data ?? []) : [],
		isLoading: isSessionPending
			? query.isLoading
			: !!userId && query.isLoading,
		isError: !!userId && query.isError,
		error: userId ? query.error : null,
	};
}
