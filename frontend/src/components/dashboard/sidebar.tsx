import Link from '@/components/ui/link';
import {siteSettings} from '@/config/site';
import {useRouter} from 'next/router';
import classNames from 'classnames';
import {useLogout,useUser} from '@/data/user';

type DashboardSidebarProps = {
	className?: string;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({className}) => {
	const {mutate: logout} = useLogout();
	// const {data: me} = useUser();
	const {pathname} = useRouter();

	return (
		<aside className={className}>

			<div className="overflow-hidden rounded border border-border-200 bg-light mt-10">
				<ul className="py-7">
					{siteSettings.dashboardSidebarMenu
						?.slice(0,-1)
						.map((item: any,idx) => {
							return (
								<li className="py-1" key={idx}>
									<Link
										href={item.href}
										className={classNames(
											'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-accent focus:text-accent',
											{
												'!border-accent text-accent': pathname === item.href,
											}
										)}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
				</ul>
				{/* End of top part menu */}

				<ul className="border-t border-border-200 bg-light py-4">
					<li className="block py-2 px-11 ">
						<button
							onClick={() => logout()}
							className={classNames(
								'font-semibold text-heading transition-colors hover:text-accent focus:text-accent'
							)}
						>
							Salir
						</button>
					</li>
				</ul>
			</div>
		</aside>
	);
};

export default DashboardSidebar;
