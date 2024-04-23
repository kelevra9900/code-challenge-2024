import classNames from 'classnames';
import GeneralLayout from "./_home";
import DashboardSidebar from '@/components/dashboard/sidebar';

export default function DashboardLayout({children, className}: React.PropsWithChildren<{className?: string}>) {
	return(
		<GeneralLayout>
			<div className={classNames(
				'_dashboard mx-auto flex w-full max-w-1920 flex-col items-stretch bg-gray-100 px-5 py-10 lg:flex-row xl:py-14 xl:px-8 2xl:px-14',
				className,
			)}>
				<DashboardSidebar />
				{children}
			</div>
		</GeneralLayout>
	)
}