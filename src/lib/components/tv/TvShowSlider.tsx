import { ChipButton } from 'lib/components/shared/ChipButton';
import PosterCard from 'lib/components/shared/PosterCard';
import SliderContainer from 'lib/components/shared/SliderContainer';
import { MediaType } from 'lib/services/tmdb/search/multi/types';
import type {
  TVShowItem,
  TVShowListType,
} from 'lib/services/tmdb/tv/list/types';
import Link from 'next/link';
import { useRouter } from 'next/router';

type TvShowListTypeButtonProps = {
  listType: TVShowListType;
};

const TvShowListTypeButton = ({ listType }: TvShowListTypeButtonProps) => {
  return (
    <ChipButton as={Link} href={`/tv/${listType}?page=1`}>
      {listType.replaceAll('_', ' ')}
    </ChipButton>
  );
};

const tvShowListTypes: Array<TVShowListType> = [
  'on_the_air',
  'airing_today',
  'top_rated',
];

type TvShowSliderProps = {
  shows?: Array<TVShowItem>;
  sectionTitle?: string;
};

const TvShowSlider = ({ sectionTitle, shows }: TvShowSliderProps) => {
  const router = useRouter();

  const slicedShows = shows?.slice(0, 10);

  const handleClickSeeMore = () => router.push('/tv/popular?page=1');

  return (
    <SliderContainer
      footer={tvShowListTypes.map((type) => (
        <TvShowListTypeButton key={type} listType={type} />
      ))}
      onClickSeeMore={handleClickSeeMore}
      sectionTitle={sectionTitle}
    >
      {slicedShows?.map((show, idx) => (
        <PosterCard
          id={show.id ?? 0}
          imageUrl={show.poster_path}
          isLastItem={idx === slicedShows.length - 1}
          key={`${show.name}-${show.id}`}
          layout="flex"
          mediaType={MediaType.Tv}
          name={show.name}
        />
      ))}
    </SliderContainer>
  );
};

export default TvShowSlider;
