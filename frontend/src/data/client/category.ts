import {API_ENDPOINTS} from './api-endpoints';
import {crudFactory} from './crud-factory';
import {
	Category,
	QueryOptions,
} from '@/types';

export const categoryClient = {
	...crudFactory<Category,QueryOptions,any>(
		API_ENDPOINTS.CATEGORIES
	),
}
