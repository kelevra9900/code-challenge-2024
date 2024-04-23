import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Button from '@/components/ui/button';
import ItemLoader from '@/components/ui/loaders/item-loader';
import NotFound from '@/components/ui/not-found';
import ItemCard from '@/components/items/cards/card';
import ErrorMessage from '@/components/ui/error-message';
import rangeMap from '@/lib/range-map';

interface Props {
  limit?: number;
  sortedBy?: string;
  orderBy?: string;
  column?: 'five' | 'six' | 'auto';
  gridClassName?: string;
  isLoading?: boolean;
  error?: any;
  items?: any;
  loadMore?: any;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  className?: string;
}

export function Grid({
  className,
  gridClassName,
  isLoading,
  error,
  loadMore,
  isLoadingMore,
  hasMore,
  items,
  limit = 10,
  column = 'auto',
}: Props) {
  const { t } = useTranslation('common');

  if (error) return <ErrorMessage message={error.message} />;

  if (!isLoading && !items?.length) {
    return (
      <div className="w-full min-h-full px-4 pt-6 pb-8 lg:p-8">
        <NotFound text="Parece que no hay nada que mostrar" className="w-7/12 mx-auto" />
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div        className={cn(
          {
            'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3':
              column === 'auto',
            'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-11 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]':
              column === 'five',
            'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-6 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]':
              column === 'six',
          },
          gridClassName,
        )}
      >
        {isLoading && !items?.length
          ? rangeMap(limit, (i: number) => (
              <ItemLoader key={i} uniqueKey={`product-${i}`} />
            ))
          : items?.map((item: any) => (
              <ItemCard item={item} key={item.id} />
            ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8 mb-4 sm:mb-6 lg:mb-2 lg:mt-12">
          <Button
            loading={isLoadingMore}
            onClick={loadMore}
            className="text-sm font-semibold h-11 md:text-base"
          >
            {t('text-load-more')}
          </Button>
        </div>
      )}
    </div>
  );
}
interface ProductsGridProps {
  className?: string;
  gridClassName?: string;
  variables?: any;
  loading?: boolean;
  error?: any;
  column?: 'five' | 'auto';
}
export default function ProductsGrid({
  className,
  gridClassName,
  variables,
  loading,
  error,
  column = 'auto',
}: ProductsGridProps) {

  return (
    <Grid
      items={variables}
      loadMore={false}
      isLoading={loading}
      isLoadingMore={loading}
      hasMore={false}
      error={error}
      className={className}
      gridClassName={gridClassName}
      column={column}
    />
  );
}
