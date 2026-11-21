import { apiRequest } from "@/lib/api-client";
import { endpoints, queryKeys } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteFood(foodId: string) {
	const url = `${endpoints.foods}/${foodId}`;
	const response = apiRequest(url, "DELETE");
	return response;
}

export default function useDeleteFood() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteFood,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.foods });
		},
	});
	return mutation;
}
