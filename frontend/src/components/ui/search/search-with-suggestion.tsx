import SearchBox from '@/components/ui/search/search-box';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import AutoSuggestionBox from '@/components/search-view/suggestion';
import cn from 'classnames';
import { useRouter } from 'next/router';

interface Props {
  label: string;
  className?: string;
  inputClassName?: string;
  variant?: 'minimal' | 'normal' | 'with-shadow';
  seeMore?: boolean;
  [key: string]: unknown;
}

const SearchWithSuggestion: React.FC<Props> = ({
  label,
  className,
  inputClassName,
  seeMore = false,
  variant,
  ...props
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchTerm, updateSearchTerm] = useState('');

  const handleOnChange = (e: any) => {
    const { value: inputValue } = e.target;
    updateSearchTerm(inputValue);
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    if (!searchTerm) return;
  };

  function clearSearch() {
    updateSearchTerm('');
  }

  let redirectSearchPath = '';
  // if (router.asPath === '/') {
  //   redirectSearchPath = homePage?.slug;
  // } else {
  //   redirectSearchPath = router.asPath;
  // }

  const onSearchMore = (e: any) => {
    e.preventDefault();
    if (!searchTerm) return;
    const { asPath, query } = router;
    const { pages, ...restQuery } = query;
    router.push(
      {
        // pathname: redirectSearchPath + Routes.search,
        query: { ...restQuery, text: searchTerm },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };
  return (
    <div className={cn('relative w-full', className)}>
      <SearchBox
        label={label}
        onSubmit={onSearch}
        onClearSearch={clearSearch}
        onChange={handleOnChange}
        value={searchTerm}
        inputClassName={inputClassName}
        name="search"
        placeholder={'Buscar...'}
        variant={variant}
        {...props}
      />

      <AutoSuggestionBox
        searchQuery={searchTerm}
        visible={Boolean(searchTerm.length > 2)}
        seeMoreLink={onSearchMore}
        seeMore={seeMore}
      />
    </div>
  );
};

export default SearchWithSuggestion;
