import {useState,useEffect} from 'react';
import {isMobile} from 'react-device-detect';

import CategoriesLoader from "@/components/loaders/categories-loader";
import Scrollbar from '@/components/ui/scrollbar';

import {useCategoriesQuery} from "@/data/category";
import TreeMenu from '../ui/tree-menu';
import ErrorMessage from '../ui/error-message';


interface CategoriesProps {
	className?: string;
}
export default function Categories({ className }: CategoriesProps) {
	const { data, isLoading, error } = useCategoriesQuery({});
	const [isClient,setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	},[]);

	if (error) return <ErrorMessage message={error.message} />;


	if (isLoading) return(
		<div className="hidden xl:block">
			<div className="mt-8 w-72 px-2">
				<CategoriesLoader />
			</div>
		</div>
	);

	return(
		<aside className={`hidden h-full bg-light lg:sticky xl:block xl:w-72 ${className}`}>
			{
				!isMobile && (
					<div className="max-h-full mt-10 grow overflow-hidden">
						<Scrollbar
							className="max-h-screen w-full"
							style={{ height: 'calc(100vh - 5.35rem)'}}>
								{
									isClient ? (
										<div className="px-5">
											<TreeMenu items={data} className="xl:py-8 px-5" />						
										</div>
									) : ''
								}
						</Scrollbar>
					</div>
				)
			}
		</aside>
	);
}