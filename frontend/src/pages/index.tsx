import dynamic from 'next/dynamic';

import {useRouter} from 'next/router';
import {Element} from 'react-scroll';

import Seo from '@/components/seo/seo';
import HomeLayout from '@/layouts/_home';
import FilterBar from '@/layouts/filter-bar';
import BannerWithSearch from '@/components/banners/banner-with-search';
import ItemGridHome from '@/components/items/grid';
import {useContentsQuery} from '@/data/content';

const Categories = dynamic(() => import('@/components/categories/categories'));
const Home = () => {
  const {query} = useRouter();
  
  const { data, isLoading, error } = useContentsQuery({
    category: query.category,
    page: query.page,
    limit: 20,
  });

  return (
    <>
      <Seo title="Home" />
      <BannerWithSearch banners={[]} />
      <FilterBar variables={query} />
      <Element
        name="grid"
        className="flex border-t border-solid border-border-200 border-opacity-70">
        <Categories />
        <ItemGridHome
          className="px-4 pt-3.5 pb-16 lg:p-6 xl:p-8"
          variables={data}
          loading={isLoading}
          error={error}
        />
      </Element>
    </>
  );
}

Home.getLayout = function getLayout(page: any) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;