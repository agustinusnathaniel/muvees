'use client';

import { Button } from '@chakra-ui/react';
import PosterCard from 'lib/components/shared/PosterCard';
import SliderContainer from 'lib/components/shared/SliderContainer';
import type {
  ListType,
  MovieListItemType,
} from 'lib/services/tmdb/movie/list/types';
import { MediaType } from 'lib/services/tmdb/search/multi/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type MovieListTypeButtonProps = {
  listType: ListType;
};

const MovieListTypeButton = ({ listType }: MovieListTypeButtonProps) => {
  return (
    <Button asChild>
      <Link href={`/movies/${listType}?page=1`}>
        {listType.replaceAll('_', ' ')}
      </Link>
    </Button>
  );
};

const movieListTypes: Array<ListType> = [
  'now_playing',
  'top_rated',
  'upcoming',
];

type MoviesSliderProps = {
  movies?: Array<MovieListItemType>;
  sectionTitle?: string;
};

const MoviesSlider = ({ sectionTitle, movies }: MoviesSliderProps) => {
  const router = useRouter();

  const slicedMovies = movies?.slice(0, 10);

  const handleClickSeeMore = () => router.push('/movies/popular?page=1');

  return (
    <SliderContainer
      footer={movieListTypes.map((type) => (
        <MovieListTypeButton key={type} listType={type} />
      ))}
      onClickSeeMore={handleClickSeeMore}
      sectionTitle={sectionTitle}
    >
      {slicedMovies?.map((movie, idx) => (
        <PosterCard
          id={movie.id}
          imageUrl={movie.poster_path}
          isLastItem={idx === slicedMovies.length - 1}
          key={`${movie.title}-${movie.id}`}
          layout="flex"
          mediaType={MediaType.Movie}
          name={movie.title}
        />
      ))}
    </SliderContainer>
  );
};

export default MoviesSlider;
