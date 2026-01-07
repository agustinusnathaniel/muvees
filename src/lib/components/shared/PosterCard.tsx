import { AspectRatio, Box } from '@chakra-ui/react';
import MotionBox from 'lib/components/MotionBox';
import PosterImage from 'lib/components/shared/PosterImage';
import PosterLabel from 'lib/components/shared/PosterLabel';
import type { MediaType } from 'lib/services/tmdb/search/multi/types';
import { trackEvent } from 'lib/utils/trackEvent';
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
    <Link href={`${pathMap[mediaType]}/${id}`} legacyBehavior passHref>
      <MotionBox
        as="a"
        onClick={handleClick}
        paddingRight={isLastItem ? [8, 6] : undefined}
        position="relative"
        role="group"
        textAlign="center"
        whileHover={{ scale: 1.05 }}
        {...(layout === 'flex' && { flex: '0 0 auto' })}
      >
        {layout === 'grid' ? (
          <AspectRatio
            _groupHover={{ backgroundColor: 'black' }}
            borderRadius={24}
            ratio={3.6 / 5}
          >
            <PosterImage layout={layout} src={imageUrl} />
          </AspectRatio>
        ) : (
          <Box
            _groupHover={{ backgroundColor: 'black' }}
            as="button"
            borderRadius={24}
          >
            <PosterImage layout={layout} src={imageUrl} />
          </Box>
        )}
        <PosterLabel label={name ?? ''} />
      </MotionBox>
    </Link>
  );
};

export default PosterCard;
