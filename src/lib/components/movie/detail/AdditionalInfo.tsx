import {
  Button,
  Link as ChakraLink,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { convertToPrice } from 'lib/utils/convertToPrice';
import Link from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';
import { FaImdb } from 'react-icons/fa';
import { GrGallery } from 'react-icons/gr';

import type { MovieDetailSectionProps } from './types';

type MovieDetailAdditionalInfoProps = MovieDetailSectionProps & {
  id: number;
};

const MovieDetailAdditionalInfo = ({
  isLoading,
  data,
  id,
}: MovieDetailAdditionalInfoProps) => {
  return (
    <Grid gap={8}>
      <Skeleton loading={!!isLoading}>
        {data && (
          <Flex gridColumnGap={2}>
            {data.homepage && (
              <ChakraLink
                _hover={undefined}
                href={data.homepage}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button size="sm">
                  <BiLinkExternal />
                  website
                </Button>
              </ChakraLink>
            )}
            {data.imdb_id && (
              <ChakraLink
                href={`https://www.imdb.com/title/${data.imdb_id}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button size="sm">
                  <FaImdb />
                  IMDB
                </Button>
              </ChakraLink>
            )}

            <Button asChild size="sm">
              <Link href={`/movie/${id}/images`}>
                <GrGallery />
                gallery
              </Link>
            </Button>
          </Flex>
        )}
      </Skeleton>

      <Skeleton display="grid" gap={4} loading={!!isLoading}>
        <Heading fontSize="lg">Achievements</Heading>

        <Grid
          fontSize="sm"
          gridGap={1}
          letterSpacing={2}
          textTransform="uppercase"
        >
          <Text>
            Revenue:{' '}
            <Text as="span" fontWeight="bold" letterSpacing={0}>
              {convertToPrice(data.revenue)}
            </Text>
          </Text>
          <Text>
            Rating: <b>{data.vote_average}</b>{' '}
            <Text as="span" fontSize="xs">
              {' '}
              ({data.vote_count} voted)
            </Text>
          </Text>
        </Grid>
      </Skeleton>
    </Grid>
  );
};

export default MovieDetailAdditionalInfo;
