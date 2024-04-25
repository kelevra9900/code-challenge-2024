import {API_ENDPOINTS} from './api-endpoints';
import {crudFactory} from './crud-factory';
import {
	Theme,
	QueryOptions,
} from '@/types';

export const themeClient = {
	...crudFactory<Theme,QueryOptions,any>(
		API_ENDPOINTS.THEMES
	),
}
