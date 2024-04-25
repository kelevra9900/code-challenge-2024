import {useQuery} from "react-query";
import {API_ENDPOINTS} from "./client/api-endpoints";
import {themeClient} from "./client/themes";

export const useThemesQuery = (options: Partial<any>) => {
	const {data,error,isLoading} = useQuery<any,Error>(
		[API_ENDPOINTS.THEMES,options],
		({queryKey,pageParam}) =>
			themeClient.paginated(Object.assign({},queryKey[1],pageParam)),
		{
			keepPreviousData: true,
		}
	);

	return {
		data: data?.responseObject ?? [],
		error,
		isLoading,
	}
}