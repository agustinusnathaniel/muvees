import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => (
  <Flex align="center" justify="center" minHeight="50vh" paddingY={16}>
    <Spinner size="xl" />
  </Flex>
);

export default Loading;
