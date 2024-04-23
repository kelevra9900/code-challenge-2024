import {DefaultSeo as NextDefaultSeo} from 'next-seo';

const DefaultSeo = () => {
	return (
		<NextDefaultSeo
			additionalMetaTags={[
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1 maximum-scale=1',
				},
				{
					name: 'apple-mobile-web-app-capable',
					content: 'yes',
				},
				{
					name: 'theme-color',
					content: '#ffffff',
				},
			]}
			additionalLinkTags={[
				{
					rel: 'apple-touch-icon',
					href: 'icons/apple-icon-180.png',
				},
				{
					rel: 'manifest',
					href: '/manifest.json',
				},
			]}
			title={'Multimedia Store'}
			titleTemplate={`Code Challenge | %s`}
			defaultTitle="Multimedia store"
			description={'Code Challenge for Multimedia Store'}
			canonical={'https://multimedia-store.vercel.app/'}
			openGraph={{
				title: 'Multimedia Store',
				description: 'Code Challenge for Multimedia Store',
				type: 'website',
				locale: 'en_US',
				site_name: 'Multimedia Store',
				images: [
					{
						url: 'https://multimedia-store.vercel.app/icons/apple-icon-180.png',
						width: 800,
						height: 600,
						alt: 'Multimedia Store',
					},
				],
			}}
			twitter={{
				handle: '@handle',
				site: '@site',
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default DefaultSeo;
