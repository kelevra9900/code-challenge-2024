import {useQuery} from 'react-query';
import {API_ENDPOINTS} from './client/api-endpoints';
import {contentClient} from './client/content';

export const useContentsQuery = (options: Partial<any>) => {
	const {data,error,isLoading} = useQuery<any,Error>(
		[API_ENDPOINTS.CONTENTS,options],
		({queryKey,pageParam}) =>
			contentClient.paginated(Object.assign({},queryKey[1],pageParam)),
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

export function useContent({id}: {id: string}){
	const { data, error, isLoading } = useQuery<any, Error>(
		[API_ENDPOINTS.CONTENTS,{id}],
		() => contentClient.get({id}),
	);

	return{
		data: data?.responseObject,
		isLoading,
		error
	}
}