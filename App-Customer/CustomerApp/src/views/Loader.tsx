import React from 'react';
import { Box, Image, Button, Text, VStack, Badge } from 'native-base';
import Images from './../configs/images';
import myStyles from './../configs/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';

type LoadingScreenProps = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const Loader: React.FC<LoadingScreenProps> = ({ navigation }) => {
    return (
        <Box bg={'primary.600'}
            style={myStyles.flexCenter}>
            <Image source={Images.logo} alt='logo' />
            <VStack>
                <Badge bg={"red.600"} zIndex={1} rounded={"full"} alignSelf="flex-end" mb={-4} mr={-4} variant="solid">
                    3
                </Badge>
                <Button colorScheme={"green"} _text={{
                    fontSize: 14
                }}>
                    Notifications
                </Button>
            </VStack>

        </Box>
    );
};


export default Loader;
