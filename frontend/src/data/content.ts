import {useMutation, useQuery, useQueryClient} from 'react-query';
import {toast} from 'react-toastify';
import {API_ENDPOINTS} from './client/api-endpoints';
import {contentClient} from './client/content';

export const useContentsQuery = (options: Partial<any>) => {
	const {data,error,isLoading} = useQuery<any,Error>(
		[API_ENDPOINTS.CONTENTS,options],
		({queryKey,pageParam}) =>
			contentClient.paginated(Object.assign({
				page: 1,
				limit: 20,
			},queryKey[1],pageParam)),
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

export const useCreateContentMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(contentClient.create, {
		onSuccess: () => {
			queryClient.invalidateQueries(API_ENDPOINTS.CONTENTS);
			toast.success('Content created successfully');
		}
	});
}