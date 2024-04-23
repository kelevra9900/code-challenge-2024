import type {ReactElement,ReactNode} from 'react';
import type {NextPage} from 'next';
import {extend} from 'lodash';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
	authenticationRequired?: boolean;
	getLayout?: (page: ReactElement) => ReactNode;
};

export interface RegisterUserInput {
	name: string;
	email: string;
	password: string;
}

export interface SearchParamOptions {
	text: string;
	category: string;
}

export interface CreateCategoryInput {
	name: string;
	slug: string;
	icon?: string;
	image?: string;
}
export interface UserResponse extends ResponseData {
	responseObject: User;
}
export interface ResponseData {
	success: boolean;
	message: string;
	responseObject: any;
	statusCode: number;
}

export interface UpdateUserInput extends Partial<User> {
	id: string;
}

export interface User {
	_id: string;
	username: string;
	email: string;
	role: string;
	authentication: {
		sessionToken: string;
	};
	createdAt: string;
	updatedAt: string;
}

export interface Attachment {
	id: number;
	original: string;
	thumbnail: string;
	__typename?: string;
	slug?: string;
}

export interface Banner {
	id: string;
	title: string;
	description: string;
	image: Attachment;
}

export interface LoginUserInput {
	email: string;
	password: string;
}

export interface Category {
	_id: string;
	name: string;
	slug: string;
	icon?: string;
	image?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Content {
	_id: string;
	slug: string;
	text: string;
	title: string;
	type: string;
	url: string;
	createAt: string;
	updateAt: string;
}


export interface QueryOptions {
	limit?: number;
	page?: number;
	orderBy?: string;
}

export interface GetParams {
	id: string;
}

export interface PaginatorInfo<T> {
	current_page: number;
	data: T[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: any[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
}

export interface Theme {
	_id: string;
	name: string;
	categoryId: string;
	allowImage: boolean;
	allowVideos: boolean;
	allowText: boolean;
}