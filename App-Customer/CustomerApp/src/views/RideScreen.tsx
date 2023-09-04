import React from 'react';
import myStyles from '../configs/styles';
import { Text, Box, Button, Flex, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routers/navigationParams';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/reducers';
import DriverProfile from './../component/Profile/Driver';
import { DriverModels } from './../models/Driver/index';
import { Images } from './../configs/images';
 
type RideScreenProps = NativeStackScreenProps<RootStackParamList, 'Ride'>;

const driver:DriverModels={
  phone:"0913447801",
	cccd:"052000468",
	name:"Harry Bui",
	image:Images.profile,
	vehicleImage:Images.carType,
	vehicleName:"Chevrolet Corvette",
	vehicleType:"4 seats",
	vehicleNumber:"51C1-13234",
}

const RideScreen: React.FC<RideScreenProps> = ({navigation}) => {

  return (
   <Flex margin={"auto"} height={"90%"}>
      <VStack space={4}>
        <DriverProfile data={driver}/>
      </VStack>
   </Flex>
  );
};

export default RideScreen;
// onPress={() => navigation.navigate('Loading')