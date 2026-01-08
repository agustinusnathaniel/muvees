import { Field, Input } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeQuery = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      const queryParam = e.target.value
        ? `?query=${e.target.value}&page=1`
        : '';

      router.push(`/movies/search${queryParam}`);
    }, 500),
    []
  );

  return (
    <Field.Root marginY={2}>
      <Input
        borderRadius={24}
        defaultValue={query ?? undefined}
        fontSize="sm"
        onChange={handleChangeQuery}
        placeholder="Movie Title"
        type="text"
      />
    </Field.Root>
  );
};

export default SearchBox;
