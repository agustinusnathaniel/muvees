import { MultiSearchPage } from 'lib/pages/search/multi';
import { Suspense } from 'react';

const SearchPage = () => {
  return (
    <Suspense>
      <MultiSearchPage />
    </Suspense>
  );
};

export default SearchPage;
