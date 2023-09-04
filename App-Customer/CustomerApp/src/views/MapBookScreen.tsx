import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routers/navigationParams';

import MapBook from '../component/MapBook';
import ChoiceOrign from '../component/ChoiceOrign';
import FlatListCar from '../component/FlatListCar';
import {useSelector} from 'react-redux';
import {
  selectStep,
  selectLocationDriver,
  selectorigin,
} from '../redux/reducers';
import {Images} from '../configs/images';
import {useDispatch} from 'react-redux';
import {setStep} from '../redux/reducers';
import {Button} from 'native-base';
import {Divider} from 'native-base';
import {Google_Map_Api_Key} from '@env';
import * as io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const DATA: ItemData[] = [
  {
    id: '1',
    title: 'AndreCar',
    detail: 'Muximum 4 passengers',
    price: '120.000',
  },
  {
    id: '2',
    title: 'AndreCar',
    detail: 'Muximum 4 passengers',
    price: '120.000',
  },
  {
    id: '3',
    title: 'AndreCar',
    detail: 'Muximum 4 passengers',
    price: '120.000',
  },
  {
    id: '4',
    title: 'AndreCar',
    detail: 'Muximum 4 passengers',
    price: '120.000',
  },
  {
    id: '5',
    title: 'AndreCar',
    detail: 'Muximum 4 passengers',
    price: '120.000',
  },
];
type ItemData = {
  id: string;
  title: string;
  detail: string;
  price: string;
};

type MapBookScreenProps = NativeStackScreenProps<RootStackParamList, 'MapBook'>;
const MapBookScreen: React.FC<MapBookScreenProps> = ({navigation}) => {
  const [selectedId, setSelectedId] = useState<string>();
  const Step = useSelector(selectStep);
  const origin = useSelector(selectorigin);

  const Booking = () => {
    socket.emit('Booking Verhical', origin);
    navigation.navigate('MapBook');
  };

  React.useEffect(() => {}, [Step, socket]);
  const dispatch = useDispatch();
  return (
    <View className="relative h-full w-full">
      <MapBook />
      <TouchableOpacity
        onPress={() => {
          dispatch(
            setStep({
              name: 'Not Success location',
            }),
          );
          navigation.goBack();
        }}
        className=" absolute flex flex-row w-[20%] h-[10%] ">
        <View className=" flex flex-row justify-start items-center ml-3">
          <Image source={Images.angle}></Image>
          <Text className="text-bold">Back</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MapBookScreen;
