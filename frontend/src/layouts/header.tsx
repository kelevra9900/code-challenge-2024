import {useState,useMemo, useCallback} from "react";
import cn from "classnames";
import {motion} from 'framer-motion';
import {useAtom} from 'jotai';

import {SearchIcon} from "@/components/icons/search-icon";
import {isMultiLangEnable} from "@/lib/constants";
import {displayMobileHeaderSearchAtom} from "@/store/display-mobile-header-search-atom";
import Logo from "@/components/ui/logo";
import {CloseIcon} from "@/components/icons/close-icon";
import Button from "@/components/ui/button";;
import {useIsHomePage} from "@/lib/use-is-homepage";
import {useHeaderSearch} from "./headers/header-search-atom";
import {authorizationAtom} from "@/store/authorization-atom";
import AuthorizedMenu from "@/components/menu/authorized-menu";
import JoinButton from "@/components/ui/join-button";
import LanguageSwitcher from "@/components/ui/language-switcher";
import Search from "@/components/ui/search/search";
import {drawerAtom} from "@/store/drawer-atom";

const Header = () => {
	const [displayMobileHeaderSearch,setDisplayMobileHeaderSearch] = useAtom(
		displayMobileHeaderSearchAtom,
	);
	const [_,setDrawerView] = useAtom(drawerAtom);

	const [openDropdown,setOpenDropdown] = useState(false);
	const {show} = useHeaderSearch();
	const isHomePage = useIsHomePage();
	const [isAuthorize] = useAtom(authorizationAtom);


	const isFlattenHeader = useMemo(
		() => !show && isHomePage,
		[show,isHomePage],
	);
	const handleSidebar = useCallback((view: string) => {
		return setDrawerView({display: true,view});
	},[]);
	return(
		<>
			<header className="top-0 z-50 w-full transition-all sticky lg:fixed">
				<div
					className={cn(
						'fixed inset-0 -z-10 h-[100vh] w-full bg-black/50',
						openDropdown === true ? '' : 'hidden',
					)}
				></div>
				<div>
					<div
						className={cn(
							'flex w-full transform-gpu items-center justify-between bg-light px-5 transition-transform duration-300 lg:h-22 lg:px-6 2xl:px-8',
							{
								'lg:absolute lg:border-0 lg:bg-transparent lg:shadow-none':
									isFlattenHeader,
								'lg:!bg-light': openDropdown,
							},
						)}
					>
						<motion.button
							onClick={() => handleSidebar('MAIN_MENU_VIEW')}
							className="group hidden h-full w-6 shrink-0 items-center justify-center focus:text-accent focus:outline-0 ltr:mr-6 rtl:ml-6 lg:flex xl:hidden"
						>
							<span className="sr-only">Burguer menu</span>
							<div className="flex w-full flex-col space-y-1.5">
								<span className="h-0.5 w-1/2 rounded bg-gray-600 transition-all group-hover:w-full" />
								<span className="h-0.5 w-full rounded bg-gray-600 transition-all group-hover:w-3/4" />
								<span className="h-0.5 w-3/4 rounded bg-gray-600 transition-all group-hover:w-full" />
							</div>
						</motion.button>
						<div className="flex shrink-0 grow-0 basis-auto flex-wrap items-center ltr:mr-auto rtl:ml-auto lg:w-auto lg:flex-nowrap">
							<Logo
								className={cn(
									'py-3',
									!isMultiLangEnable ? 'mx-auto lg:mx-0' : 'ltr:ml-0 rtl:mr-0 ',
								)}
							/>
						</div>

						{isHomePage ? (
							<>
								{(displayMobileHeaderSearch && show) ||
									displayMobileHeaderSearch ? (
									<div className="absolute top-0 z-20 flex h-full w-full items-center justify-center space-x-4 border-b-accent-300 bg-light px-5 py-1.5 backdrop-blur ltr:left-0 rtl:right-0 rtl:space-x-reverse lg:border lg:bg-opacity-30">
										<Search
											label={'Buscar'}
											variant="minimal"
											className="lg:max-w-3xl"
											inputClassName="lg:border-accent-400"
										/>
										<Button
											variant="custom"
											onClick={() =>
												setDisplayMobileHeaderSearch((prev) => !prev)
											}
											className="hidden border border-accent-400 bg-gray-100 !px-4 text-accent lg:inline-flex"
										>
											<CloseIcon className="h-5 w-5" />
										</Button>
									</div>
								) : null}
							</>
						) : null}
						<div className="flex shrink-0 items-center space-x-7 rtl:space-x-reverse 2xl:space-x-10">
							<ul className="hidden shrink-0 items-center space-x-7 rtl:space-x-reverse xl:flex 2xl:space-x-10">
								{/* <StaticMenu /> */}
							</ul>
							<div className="flex items-center space-x-4 rtl:space-x-reverse">
								{(isHomePage && show) || isHomePage ? (
									<Button
										variant="custom"
										className="hidden h-[38px] w-[38px] items-center  gap-2 rounded-full border border-border-200 bg-light !p-1 text-sm !font-normal focus:!shadow-none focus:!ring-0 md:text-base lg:!flex"
										onClick={() =>
											setDisplayMobileHeaderSearch((prev) => !prev)
										}
									>
										<SearchIcon className="h-4 w-4" />
									</Button>
								) : null}

								<div className="hidden lg:inline-flex">
									{isAuthorize ? <AuthorizedMenu /> : <JoinButton />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;