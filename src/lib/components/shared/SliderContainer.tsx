import { Box, Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';

type SliderContainerProps = {
  sectionTitle?: string;
  onClickSeeMore?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

const SliderContainer = ({
  sectionTitle,
  onClickSeeMore,
  children,
  footer,
}: SliderContainerProps) => {
  return (
    <Box>
      {sectionTitle && (
        <Flex alignItems="center" marginX={{ base: 8, sm: 0 }}>
          <Heading
            fontSize={{ base: 'md', sm: 'lg' }}
            fontWeight="400"
            letterSpacing={2}
            textTransform="uppercase"
          >
            {sectionTitle}
          </Heading>

          <Button
            marginLeft="auto"
            onClick={onClickSeeMore}
            size={{ base: 'xs', sm: 'sm' }}
          >
            see more
          </Button>
        </Flex>
      )}

      <Flex overflowX="scroll" paddingX={[8, 6]}>
        <Flex
          alignItems="center"
          flexWrap="nowrap"
          gridColumnGap={6}
          minHeight="250px"
          overflow="visible"
          overflowX="scroll"
        >
          {children}
        </Flex>
      </Flex>

      <Spacer height={4} />

      {footer ? (
        <HStack gap={4} paddingX={{ base: 8, sm: 0 }}>
          {footer}
        </HStack>
      ) : null}
    </Box>
  );
};

export default SliderContainer;
