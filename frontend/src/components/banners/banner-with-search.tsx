import {useEffect, useRef} from 'react';
import {useIntersection} from 'react-use';
import cn from 'classnames';

import {Swiper,SwiperSlide,Navigation} from '@/components/ui/slider';
import {Banner} from '@/types';
import {useReverse} from '@/lib/reverse';
import Image from 'next/image';
import {itemPlaceholder} from '@/lib/placeholders';
import Search from '../ui/search/search';
import {ArrowNext, ArrowPrev} from '../icons';
import {useHeaderSearch} from '@/layouts/headers/header-search-atom';

interface BannerProps {
	banners: Banner[] | undefined;
}
const BannerWithSearch: React.FC<BannerProps> = ({ banners }) => {
	const {showHeaderSearch,hideHeaderSearch} = useHeaderSearch();
	const intersectionRef = useRef(null);
	const intersection = useIntersection(intersectionRef,{
		root: null,
		rootMargin: '0px',
		threshold: 1,
	});
	const reverseBanners = useReverse({items: banners as Banner[]});

	useEffect(() => {
		if (intersection && intersection.isIntersecting) {
			hideHeaderSearch();
			return;
		}
		if (intersection && !intersection.isIntersecting) {
			showHeaderSearch();
		}
	},[intersection]);

	return(
		<div className="relative hidden lg:block">
			<div className="-z-1 overflow-hidden">
				<div className="relative">
					<Swiper
						id="banner"
						modules={[Navigation]}
						resizeObserver={true}
						allowTouchMove={false}
						slidesPerView={1}
						navigation={{
							nextEl: '.banner-next',
							prevEl: '.banner-prev',
						}}
					>
						{reverseBanners?.map((banner,idx) => (
							<SwiperSlide key={idx}>
								<div
									className={cn('relative h-screen w-fullmax-h-[320px] md:max-h-[680px]')}
								>
									<Image
										className="h-full min-h-140 w-full object-cover"
										src={itemPlaceholder}
										alt={banner?.title ?? ''}
										fill
										sizes="(max-width: 768px) 100vw"
									/>
									<div
										className={cn(
											'absolute inset-0 mt-8 flex w-full flex-col items-center justify-center p-5 text-center md:px-20 lg:space-y-10',
										)}
									>
										<h1
											className={cn(
												'text-2xl font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl',
											)}
										>
											{banner?.title}
										</h1>
										<p className="text-sm text-heading lg:text-base xl:text-lg">
											{banner?.description}
										</p>
										<div className="w-full max-w-3xl" ref={intersectionRef}>
											<Search label="search" />
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					{banners && banners?.length > 1 ? (
						<>
							<div
								className="banner-prev absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-200 transition-all duration-200 ltr:left-4 rtl:right-4 md:-mt-5 ltr:md:left-5 rtl:md:right-5"
								role="button"
							>
								<span className="sr-only">{'Atrás'}</span>
								<ArrowNext width={18} height={18} />
							</div>
							<div
								className="banner-next absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-200 transition-all duration-200 ltr:right-4 rtl:left-4 md:-mt-5 ltr:md:right-5 rtl:md:left-5"
								role="button"
							>
								<span className="sr-only">{'Siguiente'}</span>
								<ArrowPrev width={18} height={18} />
							</div>
						</>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
}

export default BannerWithSearch;