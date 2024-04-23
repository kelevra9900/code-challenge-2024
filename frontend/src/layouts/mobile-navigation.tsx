import {useRouter} from "next/router";
import {useAtom} from 'jotai';
import {motion} from 'framer-motion';

import {authorizationAtom} from '@/store/authorization-atom';
import {NavbarIcon} from "@/components/icons/navbar-icon";
import {HomeIcon} from "@/components/icons/home-icon";
import {UserIcon} from "@/components/icons/user-icon";

export default function MobileNavigation({
	children,
}: React.PropsWithChildren<{}>) {
	const router = useRouter();
	const [isAuthorize] = useAtom(authorizationAtom);

	return(
		<nav className="visible fixed bottom-0 z-10 flex h-12 w-full justify-between bg-light py-1.5 px-2 shadow-400 ltr:left-0 rtl:right-0 md:h-14 lg:hidden">
			<motion.button
				whileTap={{scale: 0.88}}
				// onClick={() => handleSidebar('MAIN_MENU_VIEW')}
				className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-0">
				<span className="sr-only">Button</span>
				<NavbarIcon />
			</motion.button>
			{children}	
			<motion.button
				whileTap={{scale: 0.88}}
				onClick={() => router.push('/')}
				className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-0"
			>
				<span className="sr-only">Home</span>
				<HomeIcon />
			</motion.button>
			{isAuthorize ? (
				<motion.button
					whileTap={{scale: 0.88}}
					// onClick={() => handleSidebar('AUTH_MENU_VIEW')}
					className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-0"
				>
					<span className="sr-only">User</span>
					<UserIcon />
				</motion.button>
			) : (
				<motion.button
					whileTap={{scale: 0.88}}
					// onClick={handleJoin}
					className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-0"
				>
						<span className="sr-only">User</span>
					<UserIcon />
				</motion.button>
			)}	
		</nav>
	);
}