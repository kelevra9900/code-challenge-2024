import {API_ENDPOINTS} from './api-endpoints';
import {crudFactory} from './crud-factory';
import {
	Content,
	QueryOptions,
} from '@/types'

export const contentClient = {
	...crudFactory<Content,QueryOptions,any>(
		API_ENDPOINTS.CONTENTS
	),
}