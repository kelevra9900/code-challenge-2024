import {Routes} from '@/config/routes';

export const siteSettings = {
	name: 'Code challenge',
	description: '',
	logo: {
		url: '/logo.svg',
		alt: 'Code Challenge',
		href: '/',
		width: 128,
		height: 40,
	},
	defaultLanguage: 'es',
	authorizedLinks: [
		{href: Routes.profile,label: 'Cuenta'},
	],
	authorizedLinksMobile: [
		{href: Routes.profile,label: 'Perfil'},
		{href: Routes.changePassword,label: 'Cambiar contraseña'},
	],
	dashboardSidebarAuth: [
		{
			href: Routes.categories,
			label: 'Categorías',
		},
		{
			href: Routes.themes,
			label: 'Temas',
		},
		{
			href: Routes.contents,
			label: 'Contenido',
		},
	],
	dashboardSidebarMenu: [
		{
			href: Routes.profile,
			label: 'Perfil',
		},
		{
			href: Routes.changePassword,
			label: 'Cambiar contraseña',
		},
		{
			href: Routes.logout,
			label: 'Salir',
		},
	],
	headerLinks: [
		{href: Routes.home,label: 'text-home'},
	],
};
