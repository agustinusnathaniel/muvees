import type { ButtonProps } from '@chakra-ui/react';
import { Button, forwardRef } from '@chakra-ui/react';

export const ChipButton = forwardRef<ButtonProps, 'button'>(
  ({ children, ...props }: ButtonProps, ref) => {
    return (
      <Button
        ref={ref}
        size={{ base: 'xs', sm: 'sm' }}
        textTransform="capitalize"
        {...props}
      >
        {children}
      </Button>
    );
  }
);
