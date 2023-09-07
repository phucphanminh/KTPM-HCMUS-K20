import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routers/navigationParams';
import Map from '../component/Map';
import ChoiceOrign from '../component/ChoiceOrign';
import FlatListCar from '../component/FlatListCar';
import {useSelector} from 'react-redux';
import {
  selectStep,
  selectorigin,
} from '../redux/reducers';
import {Images} from '../configs/images';
import {useDispatch} from 'react-redux';
import {setStep} from '../redux/reducers';
import {Button} from 'native-base';
import {Divider} from 'native-base';
import {Google_Map_Api_Key} from '@env';
import { SocketIOClient } from '../socket';


const DATA: ItemData[] = [
  {
    id: '1',
    title: 'Andree',
    destination: 'Muximum 4 passengers',
    origin: 'Muximum 4 passengers',
    price: '120.000',
  },
  {
    id: '2',
    title: 'Wxrdie',
    destination: 'Muximum 4 passengers',
    origin: 'Muximum 4 passengers',
    price: '120.000',
  },
];
type ItemData = {
  id: string;
  title: string;
  destination: string;
  origin: string;
  price: string;
};

type BookScreenProps = NativeStackScreenProps<RootStackParamList, 'Book'>;
const BookScreen: React.FC<BookScreenProps> = ({navigation}) => {
  const [selectedId, setSelectedId] = useState<string>();
  const Step = useSelector(selectStep);
  const origin = useSelector(selectorigin);
  const socket=SocketIOClient.getInstance()
  
  // socket.emit('join_room', 'driver1');
  socket.emitJoinRoom("driver1")
  const AcceptBooking = () => {
    // socket.emit('send_location_to_customer', origin);
  };

  // React.useEffect(() => {
  //   // socket.on('send_location_to_driver', data => {
  //   //   console.log(data);
  //   // });
  // }, [socket]);
  const dispatch = useDispatch();
  return (
    <View className="h-full w-full">
      <Map></Map>

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
                destination={item.destination}
                origin={item.origin}
                price={item.price}
              />
            </TouchableOpacity>
          )}
        />
        <View className=" absolute bottom-0 flex flex-col items-center w-full h-[25%] justify-end bg-white ">
          <Button
            className=" mb-2 h-[50%] w-[60%] rounded-[20px]"
            onPress={AcceptBooking}>
            <Text className="text-xl font-semibold text-white">
              Book Ride now
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default BookScreen;
