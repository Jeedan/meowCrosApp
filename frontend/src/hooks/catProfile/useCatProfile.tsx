import { apiRequest } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { endpoints, queryKeys } from "@/utils/constants";
import { CatProfileResponse } from "@shared/index";
import { useQuery } from "@tanstack/react-query";

async function getCat() {
	return await apiRequest<CatProfileResponse>(endpoints.cats, "GET");
}

export default function useCatProfile() {
	const { data: session, isPending: isSessionPending } =
		authClient.useSession();

	const userId = session?.user.id;

	const query = useQuery({
		queryKey: [queryKeys.catProfile, userId],
		queryFn: getCat,
		enabled: !!userId,
	});

	return {
		cat: userId ? (query.data ?? undefined) : undefined,
		isLoading: isSessionPending || (!!userId && query.isLoading),
		isError: !!userId && query.isError,
		error: userId ? query.error : null,
	};
}
