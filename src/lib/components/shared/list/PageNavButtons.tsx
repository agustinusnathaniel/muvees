import { Button, Grid, Skeleton, Text } from '@chakra-ui/react';

export type PageNavButtonProps = {
  isLoading: boolean;
  page?: number;
  totalPages: number;
  onClickNext: () => void;
  onClickPrev: () => void;
};

const PageNavButtons = ({
  isLoading,
  page,
  totalPages,
  onClickNext,
  onClickPrev,
}: PageNavButtonProps) => {
  return (
    <Skeleton isLoaded={!isLoading} marginY={4}>
      {totalPages > 1 ? (
        <Grid rowGap={4}>
          <Text
            fontSize="sm"
            letterSpacing={2}
            marginY={2}
            textAlign="center"
            textTransform="uppercase"
          >
            Page: <b>{page ?? 0}</b> / {totalPages}
          </Text>

          <Grid gap={4} templateColumns={['repeat(2, 1fr)']}>
            <Button disabled={page === 1} onClick={onClickPrev}>
              prev
            </Button>
            <Button disabled={page === totalPages} onClick={onClickNext}>
              next
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Skeleton>
  );
};

export default PageNavButtons;
