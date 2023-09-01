import React from 'react';
import { Box, Text, theme } from 'native-base';

type DividerProps = {
  children?: React.ReactNode; 
  width?:string|number;
  backgroundColor?:string|undefined;
};

const Divider: React.FC<DividerProps> = (props) => { 
	const {children,width,backgroundColor}=props
  return (
    <Box width={width} style={{ flexDirection: 'row', alignItems: 'center' }}>
      {children ? (
        <>
          <Box style={{ flex: 1, height: 1.5, backgroundColor: backgroundColor||theme.colors.gray[400] }} />
          <Box>
            <Text style={{ width: 'auto', paddingHorizontal: 10, textAlign: 'center' }}>or</Text>
          </Box>
          <Box style={{ flex: 1, height: 1.5, backgroundColor: backgroundColor||theme.colors.gray[400] }} />
        </>
      ) : (
        <Box style={{ flex: 1, height: 1.5, backgroundColor: backgroundColor||theme.colors.gray[400] }} />
      )}
    </Box>
  );
};

export default Divider;
