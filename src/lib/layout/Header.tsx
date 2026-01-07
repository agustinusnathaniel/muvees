import { Flex, Grid, Heading, IconButton } from '@chakra-ui/react';
import { trackEvent } from 'lib/utils/trackEvent';
import Link from 'next/link';
import { GoSearch } from 'react-icons/go';

import AppMenu from './AppMenu';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const handleClickSearch = () => {
    trackEvent({
      eventName: 'Nav Link: Search',
      eventData: { type: 'navigate' },
    });
  };

  return (
    <Flex align="center" as="header" padding="8" width="full">
      <Link href="/">
        <Heading as="h1" fontSize={['md', 'xl']}>
          muvees
        </Heading>
      </Link>

      <Grid gap={1} marginLeft="auto" templateColumns="repeat(3, 1fr)">
        <Link href="/search" legacyBehavior passHref>
          <IconButton
            aria-label="search"
            as="a"
            background="none"
            icon={<GoSearch />}
            onClick={handleClickSearch}
          />
        </Link>
        <ThemeToggle />
        <AppMenu />
      </Grid>
    </Flex>
  );
};

export default Header;
