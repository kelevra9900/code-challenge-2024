import cn from 'classnames';
import {twMerge} from 'tailwind-merge';

import {useModalAction} from "@/components/ui/modal/modal.context";
import {Content} from "@/types";
import Image from 'next/image';
import {Routes} from '@/config/routes';
import {useRouter} from 'next/router';

interface ShortDetailsProps {
	item: Content;
	isSticky?: boolean;
}

const ShortDetails: React.FC<ShortDetailsProps> = ({item,isSticky}) => {
	const router = useRouter();
	const {closeModal} = useModalAction();

	const navigate = (path: string) => {
		router.push(path);
		closeModal();
	};


	return (
		<div
			className={twMerge(
				cn(
					'top-0 left-0 z-50 hidden h-auto w-full max-w-6xl bg-light px-8 py-6 shadow transition-all duration-300 md:block',
					{
						'invisible -translate-y-1/2 opacity-0 md:hidden': !isSticky,
						'visible sticky translate-y-0 opacity-100': isSticky,
					}
				)
			)}>
			<div className="flex items-center">
				<div className="relative flex shrink-0 items-center justify-center overflow-hidden rounded border border-border-200 border-opacity-70 h-28 w-28">
					<Image
						src={item.url}
						alt={item.title}
						fill
						sizes="(max-width: 768px) 100vw"
						className="content-image object-contain"
					/>
				</div>
				<div className="flex flex-col justify-center overflow-hidden px-8 ltr:mr-auto rtl:ml-auto">
					<h3 
						className="cursor-pointer truncate text-lg font-semibold tracking-tight text-heading transition-colors hover:text-accent lg:text-xl"
						onClick={() => navigate(Routes.content(item._id))}>
						{item.title}
					</h3>					
				</div>
			</div>
		</div>
	);
};

export default ShortDetails;