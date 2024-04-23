import { atom } from 'jotai';

export const TOKEN = 'token';
export const AUTH_TOKEN_KEY = 'auth_token';
export const AUTH_PERMISSIONS = 'auth_permissions';
export const LIMIT = 10;
export const LIMIT_HUNDRED = 100;
export const AUTH_CRED = 'auth_cred';
export const PERMISSIONS = 'permissions';
export const ADMIN = 'admin';
export const WRITER = 'writer';
export const READER = 'reader';
export const THEMES_LIMIT = 20;
export const PRODUCT_INITIAL_FETCH_LIMIT = 30;
export const DEFAULT_LANGUAGE =
  process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE ?? 'en';
export const RESPONSIVE_WIDTH = 1024 as number;

export const checkIsScrollingStart = atom(false);

export const isMultiLangEnable =
  process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
  !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;