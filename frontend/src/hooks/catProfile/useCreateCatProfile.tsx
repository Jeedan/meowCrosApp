import { apiRequest } from "@/lib/api-client";
import { endpoints, queryKeys } from "@/utils/constants";
import { CatProfileInput, CatProfileResponse } from "@shared/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createCat(data: CatProfileInput) {
	return await apiRequest<CatProfileResponse>(endpoints.cats, "POST", data);
}

export default function useCreateCatProfile() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: [queryKeys.catProfile],
		mutationFn: createCat,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.catProfile] });
		},
	});

	return mutation;
}
