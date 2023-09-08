import React from 'react';
import myStyles from '../configs/styles';
import { Text, Box, Button, Flex, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/reducers';

type RideScreenProps = NativeStackScreenProps<RootStackParamList, 'Ride'>;

const RideScreen: React.FC<RideScreenProps> = ({ navigation }) => {



  return (
    <Flex margin={"auto"} height={"90%"}>
      <VStack space={4}>
      </VStack>
    </Flex>
  );
};

export default RideScreen;
// onPress={() => navigation.navigate('Loading')