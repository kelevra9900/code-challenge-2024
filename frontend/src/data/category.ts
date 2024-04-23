import {useMutation,useQueryClient,useQuery} from 'react-query';

import {toast} from 'react-toastify';

import {categoryClient} from './client/category';
import {API_ENDPOINTS} from './client/api-endpoints';
import { Category, GetParams } from '../types/index';

export const useCreateCategoryMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(categoryClient.create,{
		onSuccess: () => {
			toast.success('Category created successfully');
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryClient.invalidateQueries(API_ENDPOINTS.CATEGORIES);
		},
	});
}

export const useCategoryQuery = ({id}: GetParams) => {
	const {data,error,isLoading} = useQuery<Category,Error>(
		[API_ENDPOINTS.CATEGORIES,{id}],
		() => categoryClient.get({id})
	);

	return {
		data,
		error,
		isLoading,
	}
}

export const useCategoryMutation = () => {
	const queryClient = useQueryClient();

	const {mutate, isLoading, error} = useMutation(categoryClient.create, {
		onSuccess: () => {
			console.log('==== Category created successfully ====')
			toast.success('Category created successfully');
		},
		onSettled: () => {
			queryClient.invalidateQueries(API_ENDPOINTS.CATEGORIES);
		},
	})

	return {
		createCategory: mutate,
		isLoading,
		error,
	}
}

export const useCategoriesQuery = (options: Partial<any>) => {
	const {data,error,isLoading} = useQuery<any,Error>(
		[API_ENDPOINTS.CATEGORIES,options],
		({queryKey,pageParam}) =>
			categoryClient.paginated(Object.assign({},queryKey[1],pageParam)),
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