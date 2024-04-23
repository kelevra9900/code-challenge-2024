import {Grid} from '@/components/items/grid';
import {useRouter} from 'next/router';
interface Props {
	className?: string;
	variables: any;
	column?: any;
	gridClassName?: string;
}
export default function ProductGridHome({
	className,
	variables,
	column,
	gridClassName,
}: Props) {
	const {query} = useRouter();
	return (
		<Grid
			products={[]}
			loadMore={false}
			isLoading={false}
			isLoadingMore={false}
			hasMore={false}
			error={''}
			limit={10}
			className={className}
			gridClassName={gridClassName}
			column={column}
		/>
	);
}
