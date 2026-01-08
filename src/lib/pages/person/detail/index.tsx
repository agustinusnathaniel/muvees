import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Heading,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { BionifiedParagraph } from 'lib/components/BionifiedParagraph';
import PosterImage from 'lib/components/shared/PosterImage';
import { usePersonDetail } from 'lib/services/tmdb/person/detail';
import { countAge } from 'lib/utils/countAge';
import { useRouter } from 'next/router';

const PersonDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = usePersonDetail(Number(id));

  return (
    <Grid gap={8} marginX={8}>
      <Button onClick={router.back}>back</Button>

      <Skeleton loading={!!data}>
        <Box
          alignItems="start"
          display={{ base: 'grid', md: 'flex' }}
          gap={{ base: 8, md: 16 }}
        >
          {data && (
            <AspectRatio
              marginX={[8, '25%', 0]}
              minWidth={{ md: 300 }}
              ratio={3.6 / 5}
            >
              <PosterImage
                // style={{ filter: data.deathday && "grayscale(100%)" }}
                src={data.profile_path}
              />
            </AspectRatio>
          )}

          <Box>
            {data && (
              <Heading
                fontWeight="extrabold"
                letterSpacing={2}
                marginX={[8, 8, 0]}
                size="lg"
                textAlign={['center', 'center', 'inherit']}
                textTransform="uppercase"
              >
                {data.name}
              </Heading>
            )}

            {data && (
              <Grid gap={4}>
                <Box
                  fontSize="xs"
                  fontWeight="light"
                  letterSpacing={2}
                  marginY={2}
                  textTransform="uppercase"
                >
                  {data.deathday ? (
                    <Text>
                      {data.deathday} (
                      {data.birthday
                        ? countAge(data.birthday, data.deathday)
                        : ''}{' '}
                      years)
                    </Text>
                  ) : (
                    data.birthday && (
                      <Text>Age : {countAge(data.birthday)} years</Text>
                    )
                  )}
                </Box>
                <BionifiedParagraph
                  fontSize={{ base: 'sm', md: 'md' }}
                  lineHeight={1.75}
                >
                  {data.biography}
                </BionifiedParagraph>
              </Grid>
            )}
          </Box>
        </Box>
      </Skeleton>
    </Grid>
  );
};

export default PersonDetailPage;
