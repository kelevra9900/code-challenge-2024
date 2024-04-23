import {useContent} from "@/data/content";
import {AttributesProvider} from "./attributes.context";
import ShortDetails from "./short-details";
import Spinner from "@/components/ui/loaders/spinner/spinner";
import ErrorMessage from "@/components/ui/error-message";
import {useAtom} from "jotai";
import {stickyShortDetailsAtom} from "@/store/sticky-short-details-atom";
import Details from "./details";


interface ItemPopupProps {
	itemID: string;
}

const Popup: React.FC<ItemPopupProps> = ({itemID}) => {
	const [showStickyShortDetails] = useAtom(stickyShortDetailsAtom);
	const { data, isLoading, error} = useContent({id: itemID});
	if (isLoading) return (
		<div className="relative flex items-center justify-center h-96 w-96 bg-light">
			<Spinner text={'Cargando...'} />
		</div>
	)

	if (error) return <ErrorMessage message={error.message} />;

	console.log('Data received in Popup:', data);
	return(
		<AttributesProvider>
			<article className="relative z-[51] w-full max-w-6xl bg-light md:rounded-xl xl:min-w-[1152px]">
				<ShortDetails item={data} isSticky={showStickyShortDetails} />
				<Details content={data} backBtn={false} isModal={true} />
			</article>
		</AttributesProvider>
	);
};

export default Popup;