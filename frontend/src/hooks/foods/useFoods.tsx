import { apiRequest } from "@/lib/api-client";
import { endpoints, queryKeys } from "@/utils/constants";
import { FoodResponse } from "@shared/index";
import { useQuery } from "@tanstack/react-query";

async function getFoods() {
	const response = await apiRequest<FoodResponse[]>(endpoints.foods, "GET");
	return response;
}

export default function useFoods() {
	const query = useQuery({ queryKey: queryKeys.foods, queryFn: getFoods });

	return {
		foods: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
	};
}
