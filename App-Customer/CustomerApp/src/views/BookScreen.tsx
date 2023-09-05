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
import Map from '../component/Map';
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
import {setStep, setLocationDriver} from '../redux/reducers';
import {Button} from 'native-base';
import {Divider} from 'native-base';
import {Google_Map_Api_Key} from '@env';
import * as io from 'socket.io-client';
import { SOCKET } from './../socket/constants';


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

type BookScreenProps = NativeStackScreenProps<RootStackParamList, 'Book'>;
const BookScreen: React.FC<BookScreenProps> = ({navigation}) => {
  const [selectedId, setSelectedId] = useState<string>();
  const dispatch = useDispatch();
  const Step = useSelector(selectStep);
  const origin = useSelector(selectorigin);

  const Booking = () => {
    socket.emit(SOCKET.BOOKING, origin);
    navigation.navigate('MapBook');
  };

  React.useEffect(() => {
    socket.on(SOCKET.SEND_DRIVERS_LOCATION, data => {
      dispatch(setLocationDriver(data));
      console.log(data);
    });
  }, [Step, socket]);

  return (
    <View className="h-full w-full">
      <Map></Map>

      {Step.name === 'Success location' ? (
        <View className="relative h-[50%]">
          <TouchableOpacity
            onPress={() => {
              dispatch(
                setStep({
                  name: 'Not Success location',
                }),
              );
            }}
            className="flex flex-row w-[100%] h-[15%] ">
            <View className=" relative flex flex-row h-full w-full items-center justify-center mr-7 ">
              <Text className="text-xl font-semibold">Select ride</Text>
              <Image className="absolute left-4" source={Images.angle} />
            </View>
          </TouchableOpacity>
          <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            extraData={selectedId}
            renderItem={({item}) => (
              <TouchableOpacity
                className={`${item.id === selectedId ? 'bg-[#cea0a0]' : ''}`}
                onPress={() => setSelectedId(item.id)}>
                <FlatListCar
                  title={item.title}
                  detail={item.detail}
                  price={item.price}
                />
              </TouchableOpacity>
            )}
          />
          <View className=" absolute bottom-0 flex flex-col items-center w-full h-[25%] justify-end bg-white ">
            <View className="absolute top-0 flex flex-row justify-center w-full ">
              <TouchableOpacity
                className="absolute left-3 w-[50%] flex flex-row items-center mt-1"
                onPress={() => {
                  navigation.navigate('SelectWallet');
                }}>
                <Image className="h-7 w-7" source={Images.wallet} />
                <Text className="ml-2 text-xg font-bold">Choice Wallet</Text>
              </TouchableOpacity>
              <TouchableOpacity className="absolute right-3  flex flex-row items-center mt-1">
                <Image className="h-7 w-7" source={Images.wallet} />
                <Text className="ml-2 text-xg font-bold">Choice Wallet</Text>
              </TouchableOpacity>
              <Divider
                className="mt-1"
                bg="emerald.500"
                thickness="2"
                mx="2"
                height="30px"
                orientation="vertical"
              />
            </View>
            <Button
              className=" mb-2 h-[50%] w-[60%] rounded-[20px]"
              onPress={Booking}>
              <Text className="text-xl font-semibold text-white">
                Book Ride now
              </Text>
            </Button>
          </View>
        </View>
      ) : (
        <ChoiceOrign></ChoiceOrign>
      )}
    </View>
  );
};

export default BookScreen;
