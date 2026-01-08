import { AspectRatio, Box } from '@chakra-ui/react';
import MotionBox from 'lib/components/MotionBox';
import PosterImage from 'lib/components/shared/PosterImage';
import PosterLabel from 'lib/components/shared/PosterLabel';
import type { MediaType } from 'lib/services/tmdb/search/multi/types';
import { trackEvent } from 'lib/utils/track-event';
import Link from 'next/link';

const pathMap: Record<MediaType, string> = {
  movie: '/movie',
  tv: '/tv/show',
  person: '/person',
};

type PosterCardProps = {
  id: number;
  name?: string;
  imageUrl?: string;
  mediaType: MediaType;
  layout: 'flex' | 'grid';
  isLastItem?: boolean;
};

const PosterCard = ({
  id,
  name,
  imageUrl,
  mediaType,
  layout,
  isLastItem,
}: PosterCardProps) => {
  const handleClick = () => {
    trackEvent({
      eventName: `${mediaType}: ${name} - ${id}`,
      eventData: { type: 'navigate' },
    });
  };

  return (
    <MotionBox
      // https://panda-css.com/docs/docs/concepts/conditional-styles#group-selectors
      className="group"
      onClick={handleClick}
      paddingRight={isLastItem ? [8, 6] : undefined}
      position="relative"
      textAlign="center"
      whileHover={{ scale: 1.05 }}
      {...(layout === 'flex' && { flex: '0 0 auto' })}
    >
      {layout === 'grid' ? (
        <Link href={`${pathMap[mediaType]}/${id}`}>
          <AspectRatio
            _groupHover={{ backgroundColor: 'black' }}
            borderRadius={24}
            ratio={3.6 / 5}
          >
            <PosterImage layout={layout} src={imageUrl} />
          </AspectRatio>
        </Link>
      ) : (
        <Box
          _groupHover={{ backgroundColor: 'black' }}
          asChild
          borderRadius={24}
        >
          <Link href={`${pathMap[mediaType]}/${id}`}>
            <PosterImage layout={layout} src={imageUrl} />
          </Link>
        </Box>
      )}
      <PosterLabel label={name ?? ''} />
    </MotionBox>
  );
};

export default PosterCard;
