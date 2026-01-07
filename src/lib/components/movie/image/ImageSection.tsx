import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import PosterImage, {
  IMAGE_URL_ORIGINAL,
} from 'lib/components/shared/PosterImage';
import type { ImageType } from 'lib/services/tmdb/movie/images/types';

type ImageSectionProps = {
  title: string;
  data: Array<ImageType>;
  maxHeight?: number;
};

const ImageSection = ({ title, data, maxHeight }: ImageSectionProps) => {
  return (
    <Box>
      <Heading fontSize="2xl" marginX={8}>
        {title}
      </Heading>
      <Flex overflowX="scroll" paddingX={[8, 6]}>
        <Flex alignItems="center" gridGap={4} minHeight={360}>
          {data.map((image) => (
            <Link
              display="contents"
              href={`${IMAGE_URL_ORIGINAL}${image.file_path}`}
              isExternal
              key={image.file_path}
            >
              <PosterImage
                key={image.file_path}
                maxHeight={maxHeight}
                src={image.file_path}
              />
            </Link>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ImageSection;
