import React from 'react';
import { Box, Image, HStack, Spinner, Heading } from 'native-base';
import {Images} from './../configs/images';
import myStyles from './../configs/styles';

const textColor:string="secondary.600"

const Loader = () => {
    
    return (
        <Box bg={'primary.600'}
            style={myStyles.flexCenter}>
            <Image source={Images.logo} alt='logo' />
            <HStack alignItems={"center"} space={2}>
                <Spinner color={textColor} size={"sm"} accessibilityLabel="Loading ..." />
                <Heading color={textColor} fontSize="2xl" fontWeight={600}>
                    Loading...
                </Heading>
            </HStack>
        </Box>
    );
};


export default Loader;
