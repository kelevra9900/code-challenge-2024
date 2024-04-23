import {useAtom} from 'jotai';
import {motion} from 'framer-motion';

import {displayMobileHeaderSearchAtom} from '@/store/display-mobile-header-search-atom';
import MobileNavigation from './mobile-navigation';
import {SearchIcon} from '@/components/icons/search-icon';
import Header from '@/layouts/header';

export default function HomeLayout({
	children,
}: React.PropsWithChildren) {
	const [,setDisplayMobileHeaderSearch] = useAtom(
		displayMobileHeaderSearchAtom,
	);

	return (
		<div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
			<Header />
			<div className="min-h-screen">{children}</div>
			<MobileNavigation>
				<motion.button
					whileTap={{scale: 0.88}}
					onClick={() => setDisplayMobileHeaderSearch((prev) => !prev)}
					className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-0"
				>
					<span className="sr-only">Search</span>
					<SearchIcon width="17.05" height="18" />
				</motion.button>
			</MobileNavigation>
		</div>
	);
}