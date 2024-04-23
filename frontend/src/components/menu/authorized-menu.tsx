import {Fragment} from 'react';
import {Menu,Transition} from '@headlessui/react';
import {siteSettings} from '@/config/site';
import Avatar from '@/components/ui/avatar';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import cn from 'classnames';
import {avatarPlaceholder} from '@/lib/placeholders';
import {UserOutlinedIcon} from '@/components/icons/user-outlined';

const AuthorizedMenu: React.FC<{minimal?: boolean}> = ({minimal}) => {
	const router = useRouter();
	const {t} = useTranslation('common');

	function handleClick(path: string) {
		router.push(path);
	}

	return (
		<Menu
			as="div"
			className="relative inline-block ltr:text-left rtl:text-right"
		>
			<Menu.Button className="flex items-center focus:outline-0">
				{minimal ? (
					<UserOutlinedIcon className="h-5 w-5" />
				) : (
					<Avatar
						src={avatarPlaceholder}
						title="user name"
						className="h-[38px] w-[38px] border-border-200"
					/>
				)}
				<span className="sr-only">{t('user-avatar')}</span>
			</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					as="ul"
					className={cn(
						'absolute mt-5 w-48 rounded bg-white pb-4 shadow-700 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left',
						{
							'!mt-2': minimal,
						}
					)}
				>
					{siteSettings.authorizedLinks.map(({href,label}) => (
						<Menu.Item key={`${href}${label}`}>
							{({active}) => (
								<li>
									<button
										onClick={() => handleClick(href)}
										className={cn(
											'block w-full py-2.5 px-6 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent focus:outline-0 ltr:text-left rtl:text-right',
											active ? 'text-accent' : 'text-heading'
										)}
									>
										{t(label)}
									</button>
								</li>
							)}
						</Menu.Item>
					))}
					<Menu.Item>
						<li>
							<button
								onClick={() => {}}
								className={cn(
									'block w-full py-2.5 px-6 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent focus:outline-0 ltr:text-left rtl:text-right'
								)}
							>
								Salir
							</button>
						</li>
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default AuthorizedMenu;
