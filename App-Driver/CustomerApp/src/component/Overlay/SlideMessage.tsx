import {Slide, Alert, Text, Button, Center, HStack} from 'native-base';
import React, {useState, useEffect} from 'react';

export enum StatusColor {
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info',
}

type SlideMessageProps = {
  status: keyof typeof StatusColor;
  placement?: 'top' | 'right' | 'bottom' | 'left' | undefined;
  message: string;
  id?: string;
};

const SlideMessage: React.FC<SlideMessageProps> = ({
  status,
  placement = 'top',
  message,
  id,
}) => {
  const colorStatus = {
    [StatusColor.error]: 'error.600',
    [StatusColor.success]: 'success.600',
    [StatusColor.warning]: 'warning.600',
    [StatusColor.info]: 'info.600',
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setIsOpen(true);
      // Close the SlideMessage after 3 seconds
      const timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [status, message, id]);

  return (
    <Center position={'absolute'} h={32}>
      <Slide in={isOpen} placement={placement}>
        <Alert flexDirection={'row'} status={status}>
          <HStack flex={1} justifyContent={'center'} alignItems={'center'}>
            <Alert.Icon marginRight={2} />
            <Text color={colorStatus[status]} fontWeight="bold">
              {message}
            </Text>
          </HStack>
        </Alert>
      </Slide>
    </Center>
  );
};

export default SlideMessage;
