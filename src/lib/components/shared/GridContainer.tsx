import { Grid, Skeleton } from '@chakra-ui/react';

type GridContainerProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

const GridContainer = ({ isLoading, children }: GridContainerProps) => {
  return (
    <Skeleton isLoaded={!isLoading} marginY={8} minHeight="60vh">
      <Grid
        columnGap={8}
        rowGap={12}
        templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
      >
        {children}
      </Grid>
    </Skeleton>
  );
};

export default GridContainer;
