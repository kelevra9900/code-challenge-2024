import {Routes} from '@/config/routes';

export const siteSettings = {
	name: 'PickBazar',
	description: '',
	logo: {
		url: '/logo.svg',
		alt: 'PickBazar',
		href: '/grocery',
		width: 128,
		height: 40,
	},
	defaultLanguage: 'en',
	currencyCode: 'USD',
	authorizedLinks: [
		{href: Routes.profile,label: 'Perfil'},
	],
	authorizedLinksMobile: [
		{href: Routes.profile,label: 'Perfil'},
		{href: Routes.changePassword,label: 'Cambiar contraseña'},
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
		{
			href: Routes.logout,
			label: 'Salir',
		},
	],
	headerLinks: [
		{href: Routes.home,label: 'text-home'},
	],
	footer: {
		menus: [
			{
				title: 'text-explore',
				links: [
				],
			},
		],
	},
};
