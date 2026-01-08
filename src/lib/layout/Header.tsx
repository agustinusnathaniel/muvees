'use client';

import { Flex, Grid, Heading, IconButton } from '@chakra-ui/react';
import { ColorModeButton } from 'lib/components/ui/color-mode';
import { trackEvent } from 'lib/utils/trackEvent';
import Link from 'next/link';
import { GoSearch } from 'react-icons/go';

import AppMenu from './AppMenu';

const Header = () => {
  const handleClickSearch = () => {
    trackEvent({
      eventName: 'Nav Link: Search',
      eventData: { type: 'navigate' },
    });
  };

  return (
    <Flex align="center" as="header" padding="8" width="full">
      <Heading asChild fontSize={['md', 'xl']}>
        <Link href="/">muvees</Link>
      </Heading>

      <Grid gap={1} marginLeft="auto" templateColumns="repeat(3, 1fr)">
        <IconButton
          aria-label="search"
          asChild
          background="none"
          onClick={handleClickSearch}
        >
          <Link href="/search">
            <GoSearch />
          </Link>
        </IconButton>
        <ColorModeButton />
        <AppMenu />
      </Grid>
    </Flex>
  );
};

export default Header;
