import { apiRequest } from "@/lib/api-client";
import { endpoints, queryKeys } from "@/utils/constants";
import { FoodInput, FoodResponse } from "@shared/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createFood(food: FoodInput) {
	const response = await apiRequest<FoodResponse>(
		endpoints.foods,
		"POST",
		food,
	);

	return response;
}

export default function useCreateFood() {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: createFood,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: [queryKeys.foods] });
		},
	});

	return mutation;
}
