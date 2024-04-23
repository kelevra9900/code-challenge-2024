import {StarIcon} from '@/components/icons/star-icon';
import BackButton from '@/components/ui/back-button';
import {useModalAction} from '@/components/ui/modal/modal.context';
import Truncate from '@/components/ui/truncate';
import {Routes} from '@/config/routes';
import {displayImage} from '@/lib/display-product-preview-images';
import {stickyShortDetailsAtom} from '@/store/sticky-short-details-atom';
import type {Content} from '@/types';
import classNames from 'classnames';
import {useAtom} from 'jotai';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Element,scroller} from 'react-scroll';
import {useIntersection} from 'react-use';
import {useAttributes} from './attributes.context';
import CategoryBadges from './category-badges';
import {useSanitizeContent} from '@/lib/sanitize-content';

const FavoriteButton = dynamic(
	() => import('@/components/items/details/favorite-button'),
	{ssr: false},
);

type Props = {
	content: Content;
	backBtn?: boolean;
	isModal?: boolean;
};
const Details: React.FC<Props> = ({
	content,
	backBtn = true,
	isModal = false,
}) => {
	const [_,setShowStickyShortDetails] = useAtom(stickyShortDetailsAtom);

	const router = useRouter();
	const {closeModal} = useModalAction();
	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef,{
		root: null,
		rootMargin: '0px',
		threshold: 1,
	});
	useEffect(() => {
		if (intersection && intersection.isIntersecting) {
			setShowStickyShortDetails(false);
			return;
		}
		if (intersection && !intersection.isIntersecting) {
			setShowStickyShortDetails(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[intersection]);

	const navigate = (path: string) => {
		router.push(path);
		closeModal();
	};

	const scrollDetails = () => {
		scroller.scrollTo('details',{
			smooth: true,
			offset: -80,
		});
	};
	return (
		<article className="rounded-lg bg-light">
			<div className="flex flex-col border-b border-border-200 border-opacity-70 md:flex-row">
				<div className="p-6 pt-10 md:w-1/2 lg:p-14 xl:p-16">
					<div className="mb-8 flex items-center justify-between lg:mb-10">
						{backBtn && <BackButton />}
					</div>
				</div>

				<div className="flex flex-col items-start p-5 pt-10 md:w-1/2 lg:p-14 xl:p-16">
					<div className="w-full" ref={intersectionRef}>
						<div className="flex w-full items-start justify-between space-x-8 rtl:space-x-reverse">
							<h1
								className={classNames(
									`text-lg font-semibold tracking-tight text-heading md:text-xl xl:text-2xl`,
									{
										'cursor-pointer transition-colors hover:text-accent':
											isModal,
									},
								)}
								{...(isModal && {
									onClick: () => navigate(Routes.content(content._id)),
								})}
							>
								{content.title}
							</h1>

							<div>
								<FavoriteButton
									contentId={content._id}
									className={classNames({'mr-1': isModal})}
								/>
							</div>
						</div>
						<div className="mt-2 flex items-center justify-between">
							{isModal && (
								<div className="inline-flex shrink-0 items-center rounded border border-accent bg-accent px-3 py-1 text-sm text-white">
									<StarIcon className="h-2.5 w-2.5 ltr:ml-1 rtl:mr-1" />
								</div>
							)}
						</div>

						{content && (
							<div className="mt-3 text-sm leading-7 text-body md:mt-4 react-editor-description">
								<Truncate
									character={150}
									{...(!isModal && {
										onClick: () => scrollDetails(),
										compressText: 'Ver más',
									})}
								>
									{content.text}
								</Truncate>
							</div>
						)}
					</div>

					{/* {!!categories?.length && (

					)} */}
					{/* <CategoryBadges
						categories={[]}
						basePath={`/${content._id}`}
						onClose={closeModal}
					/> */}
				</div>
			</div>

			<Element
				name="details"
				className="border-b border-border-200 border-opacity-70 px-5 py-4 lg:px-16 lg:py-14"
			>
				<h2 className="mb-4 text-lg font-semibold tracking-tight text-heading md:mb-6">
					Detalles
				</h2>
				{content.text ? (
					<p
						className="text-sm text-body react-editor-description"
						dangerouslySetInnerHTML={{
							__html: content.text,
						}}
					/>
				) : (
					''
				)}
			</Element>
		</article>
	);
};

export default Details;
