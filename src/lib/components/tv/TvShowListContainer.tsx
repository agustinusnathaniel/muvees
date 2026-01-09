import GridContainer from 'lib/components/shared/GridContainer';
import PosterCard from 'lib/components/shared/PosterCard';
import { MediaType } from 'lib/services/tmdb/search/multi/types';
import type { TVShowItem } from 'lib/services/tmdb/tv/list/types';

type TvShowListContainerProps = {
  isLoading: boolean;
  shows?: Array<TVShowItem>;
};

const TvShowListContainer = ({
  shows,
  isLoading,
}: TvShowListContainerProps) => {
  return (
    <GridContainer isLoading={isLoading}>
      {shows?.map((show) => (
        <PosterCard
          id={show.id ?? 0}
          imageUrl={show.poster_path}
          key={`${show.name}-${show.id}`}
          layout="grid"
          mediaType={MediaType.Tv}
          name={show.name}
          prefetch={false}
        />
      ))}
    </GridContainer>
  );
};

export default TvShowListContainer;
