import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Spinner,
  Text,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { APP_NAME } from 'pages/_document';
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const [isBiggerThanMobile] = useMediaQuery('(min-width: 480px)');
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
        icon={<BiMenu />}
        marginLeft={2}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={isBiggerThanMobile ? 'right' : 'top'}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader>
            <Heading size="xs">More from sznm.dev</Heading>
          </DrawerHeader>

          <DrawerBody>
            {loading && <Spinner />}
            {apps
              .filter((app) => app.name !== APP_NAME)
              .map(({ name, icon, url, description }) => (
                <Link _hover={{ textDecoration: 'none' }} href={url} key={name}>
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
                      {description && <Text fontSize="xs">{description}</Text>}
                    </Box>
                  </Flex>
                </Link>
              ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppMenu;
