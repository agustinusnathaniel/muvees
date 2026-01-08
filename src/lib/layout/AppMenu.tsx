'use client';

import {
  Box,
  Drawer,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Spinner,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useColorMode } from 'lib/components/ui/color-mode';
import { useEffect, useState } from 'react';
import { BiMenu } from 'react-icons/bi';

type AppsType = {
  name: string;
  description?: string;
  icon: string;
  url: string;
};

const PROJECT_LIST_URL = `${process.env.NEXT_PUBLIC_PROJECTS_LIST_URL}`;

const AppMenu = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const [isBiggerThanMobile] = useMediaQuery(['(min-width: 480px)']);
  const [apps, setApps] = useState<Array<AppsType>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${PROJECT_LIST_URL}`)
      .then((res) => res.json())
      .then((result) => {
        setApps(result);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <IconButton
        aria-label="app-menu"
        background="none"
        marginLeft={2}
        onClick={onOpen}
      >
        <BiMenu />
      </IconButton>
      <Drawer.Root
        onOpenChange={onClose}
        open={open}
        placement={isBiggerThanMobile ? 'end' : 'top'}
      >
        <Drawer.Backdrop />

        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>More from sznm.dev</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              {loading && <Spinner />}
              {apps
                .filter((app) => app.name !== 'muvees')
                .map(({ name, icon, url, description }) => (
                  <Link
                    _hover={{ textDecoration: 'none' }}
                    href={url}
                    key={name}
                  >
                    <Flex
                      _hover={{
                        backgroundColor:
                          colorMode === 'light' ? 'gray.200' : 'gray.600',
                      }}
                      alignItems="center"
                      borderRadius={12}
                      marginY={4}
                      padding={2}
                    >
                      <Image alt={name} src={icon} width={12} />
                      <Box marginLeft={4}>
                        <Heading size="sm">{name}</Heading>
                        {description && (
                          <Text fontSize="xs">{description}</Text>
                        )}
                      </Box>
                    </Flex>
                  </Link>
                ))}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
};

export default AppMenu;
