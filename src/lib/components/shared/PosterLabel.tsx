import { Text } from '@chakra-ui/react';

type PosterLabelProps = {
  label: string;
};

const PosterLabel = ({ label }: PosterLabelProps) => {
  return (
    <Text
      _groupHover={{ visibility: 'visible' }}
      color="white"
      fontSize="xs"
      left="50%"
      letterSpacing={2}
      position="absolute"
      textAlign="center"
      textTransform="uppercase"
      top="50%"
      transform="translate(-50%, -50%)"
      visibility="hidden"
    >
      {label}
    </Text>
  );
};

export default PosterLabel;
