'use client';

import {
  Avatar,
  Button,
  Dialog,
  Field,
  Flex,
  Grid,
  Input,
  Skeleton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { IMAGE_URL } from 'lib/components/shared/PosterImage';
import type { MovieCreditsResponse } from 'lib/services/tmdb/movie/credits/types';
import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';

type CastsWrapperProps = {
  isLoadingCredits?: boolean;
  credits?: MovieCreditsResponse;
};

const CastsWrapper = ({ isLoadingCredits, credits }: CastsWrapperProps) => {
  const { open, onOpen, onClose } = useDisclosure();

  const [keyword, setKeyword] = useState<string>('');

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) =>
    setKeyword(event.target.value);

  const casts = useMemo(() => {
    if (credits) {
      return credits.cast
        .filter(
          (unfilteredCast) =>
            unfilteredCast.name.toLowerCase().indexOf(keyword.toLowerCase()) >
            -1
        )
        .map((movieCast) => (
          <Flex
            alignItems="center"
            asChild
            cursor="pointer"
            gridColumnGap={2}
            key={`${movieCast.name}-${movieCast.id}`}
          >
            <Link href={`/person/${movieCast.id}`}>
              <Avatar.Root size="lg">
                <Avatar.Fallback name={movieCast.name} />
                <Avatar.Image src={`${IMAGE_URL}${movieCast.profile_path}`} />
              </Avatar.Root>
              <Text>{movieCast.name}</Text>
            </Link>
          </Flex>
        ));
    }

    return [];
  }, [credits, keyword]);

  return (
    <Skeleton loading={!!isLoadingCredits}>
      {credits && (
        <Flex alignItems="center" gridGap={3} minHeight={24} overflowX="scroll">
          <Button borderRadius="50%" onClick={onOpen} padding={8}>
            all
          </Button>
          {credits.cast.slice(0, 20).map((movieCast) => (
            <Avatar.Root
              asChild
              cursor="pointer"
              key={`${movieCast.name}-${movieCast.id}`}
              size="lg"
            >
              <Link href={`/person/${movieCast.id}`}>
                <Avatar.Fallback name={movieCast.name} />
                <Avatar.Image src={`${IMAGE_URL}${movieCast.profile_path}`} />
              </Link>
            </Avatar.Root>
          ))}
          <Button borderRadius="50%" onClick={onOpen} padding={8}>
            more
          </Button>

          <Dialog.Root
            onOpenChange={onClose}
            open={open}
            placement="center"
            scrollBehavior="inside"
          >
            <Dialog.Backdrop />

            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Casts</Dialog.Title>
                <Field.Root marginY={2}>
                  <Input
                    onChange={handleChangeKeyword}
                    placeholder="search"
                    type="text"
                    value={keyword}
                  />
                </Field.Root>
              </Dialog.Header>
              <Dialog.CloseTrigger />

              <Dialog.Body>
                <Grid gap={4} templateColumns={['repeat(1, 1fr)']}>
                  {casts}
                </Grid>
              </Dialog.Body>

              <Dialog.Footer />
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      )}
    </Skeleton>
  );
};

export default CastsWrapper;
