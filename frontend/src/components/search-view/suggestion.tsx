import dynamic from 'next/dynamic';

const AutoSuggestion = dynamic(() => import('@/components/ui/auto-suggestion'));

interface AutoSuggestionProps {
	className?: string;
	searchQuery: string;
	visible: boolean;
	seeMore: boolean;
	seeMoreLink: (e: any) => void;
}
const AutoSuggestionBox: React.FC<AutoSuggestionProps> = ({
	searchQuery,
	className,
	visible,
	seeMoreLink,
	seeMore,
}) => {

	// if (error) return <ErrorMessage message={error.message} />;

	return (
		<AutoSuggestion
			suggestions={[]}
			notFound={false}
			visible={visible}
			seeMoreLink={seeMoreLink}
			seeMore={seeMore}
			className={className}
			showLoaders={true}
		/>
	);
};

export default AutoSuggestionBox;
