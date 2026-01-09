import GridContainer from 'lib/components/shared/GridContainer';
import PosterCard from 'lib/components/shared/PosterCard';
import type { MovieListItemType } from 'lib/services/tmdb/movie/list/types';
import { MediaType } from 'lib/services/tmdb/search/multi/types';

type MoviesContainerProps = {
  isLoading: boolean;
  movies?: Array<MovieListItemType>;
};

const MoviesContainer = ({ movies, isLoading }: MoviesContainerProps) => {
  return (
    <GridContainer isLoading={isLoading}>
      {movies?.map((movie) => (
        <PosterCard
          id={movie.id}
          imageUrl={movie.poster_path}
          key={`${movie.title}-${movie.id}`}
          layout="grid"
          mediaType={MediaType.Movie}
          name={movie.title}
          prefetch={false}
        />
      ))}
    </GridContainer>
  );
};

export default MoviesContainer;
