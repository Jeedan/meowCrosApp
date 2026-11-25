import { apiRequest } from "@/lib/api-client";
import { endpoints, queryKeys } from "@/utils/constants";
import { CatProfilePatch, CatProfileResponse } from "@shared/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateCatVariables = {
	catId: string;
	data: CatProfilePatch;
};

async function updateCat({ catId, data }: UpdateCatVariables) {
	const url = `${endpoints.cats}/${catId}`;
	const response = await apiRequest<CatProfileResponse>(url, "PATCH", data);

	return response;
}

export default function useUpdateCatProfile() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: [queryKeys.catProfile],
		mutationFn: updateCat,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.catProfile] });
		},
	});

	return mutation;
}
