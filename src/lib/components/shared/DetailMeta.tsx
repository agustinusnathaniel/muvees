import {
  AspectRatio,
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Text,
} from '@chakra-ui/react';
import { BionifiedParagraph } from 'lib/components/BionifiedParagraph';
import PosterImage from 'lib/components/shared/PosterImage';
import { useColorMode } from 'lib/components/ui/color-mode';

type DetailData = {
  name: string;
  overview?: string;
  status: string;
  tagline?: string;
  releasedDate: Date | string;
  posterPath?: string;
};

type DetailMetaProps = {
  data: DetailData;
  extras?: React.ReactNode;
};

const DetailMeta = ({ data, extras }: DetailMetaProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      alignItems="center"
      display={{ base: 'grid', md: 'flex' }}
      gap={{ base: 8, md: 16 }}
    >
      <AspectRatio
        marginX={[8, '25%', 0]}
        maxHeight={['100%']}
        maxWidth={['100%']}
        minWidth={{ base: undefined, md: 300 }}
        ratio={3.6 / 5}
      >
        <PosterImage src={data.posterPath} />
      </AspectRatio>

      <Grid gap={4}>
        <Heading
          fontWeight="bold"
          letterSpacing={2}
          marginX={[8, 8, 0]}
          size="lg"
          textAlign={['center', 'center', 'inherit']}
          textTransform="uppercase"
        >
          {data.name}
        </Heading>

        <Text
          fontSize="0.7rem"
          fontWeight="light"
          letterSpacing={2}
          marginTop={4}
          marginX={[8, 8, 0]}
          textAlign={['center', 'center', 'inherit']}
          textTransform="uppercase"
        >
          {data.tagline}
        </Text>

        <Flex alignItems="center" gridColumnGap={2}>
          <Badge variant={colorMode === 'light' ? 'solid' : 'outline'}>
            {data.status}
          </Badge>

          <Text fontSize="xs" letterSpacing={1} textTransform="uppercase">
            {new Date(data.releasedDate).getFullYear()}
          </Text>
        </Flex>

        {extras ? (
          <Flex gridGap={2} wrap="wrap">
            {extras}
          </Flex>
        ) : null}

        {data.overview && (
          <BionifiedParagraph textAlign="justify">
            {data.overview}
          </BionifiedParagraph>
        )}
      </Grid>
    </Box>
  );
};

export default DetailMeta;
