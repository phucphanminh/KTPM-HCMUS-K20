import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routers/navigationParams';
import Map from '../component/Map';
import ChoiceOrign from '../component/ChoiceOrign';
import FlatListCar from '../component/FlatListCar';
import {useSelector} from 'react-redux';
import {selectStep, selectorigin} from '../redux/reducers';
import {Images} from '../configs/images';
import {useDispatch} from 'react-redux';
import {setStep} from '../redux/reducers';
import {Button} from 'native-base';
import {Divider} from 'native-base';
import {Google_Map_Api_Key} from '@env';
import {SocketIOClient} from '../socket';
import {setLocationCustomer} from '../redux/reducers';
import useCustomNavigation from '../hooks/useCustomNavigation';
import {User} from '../appData/user/User';

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
  const [selectedId, setSelectedId] = useState<any>();
  const Step = useSelector(selectStep);
  const origin = useSelector(selectorigin);
  const socket = SocketIOClient.getInstance();
  const [ListCustomer, SetListCustomer] = useState<any[]>([]);
  const navigate = useCustomNavigation();

  const driverinfo = User.getInstance().information;

  React.useEffect(() => {
    socket.onListenCustomerLocation(data => {
      SetListCustomer(prevListCustomer => [...prevListCustomer, data]);
    });
  }, []);

  const AcceptBooking = () => {
    const driveinformation = {
      idcustomer: selectedId.data.Customer?.id,
      driver: driverinfo.tel,
      name: driverinfo.name,
      identify: driverinfo.vehicleid,
      brandName: driverinfo.brandname,
      location: origin.location,
    };
    socket.emitSendAcceptBooking(driveinformation);
    dispatch(setLocationCustomer(selectedId.data));
    console.log(selectedId);
    navigate.navigate('MapBook');
  };
  const getItemLayout = (_: any, index: number) => ({
    length: 5,
    offset: 5 * index,
    index,
  });

  React.useEffect(() => {
    console.log(ListCustomer[0]?.data?.Customer?.id);
  }, [ListCustomer.length]);
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
            <Text className="text-xl font-semibold">Select customer</Text>
            <Image className="absolute left-4" source={Images.angle} />
          </View>
        </TouchableOpacity>
        <FlatList
          data={ListCustomer}
          keyExtractor={item => item?.data.Customer?.id}
          extraData={selectedId}
          getItemLayout={getItemLayout}
          renderItem={({item}) => (
            <TouchableOpacity
              className={`${
                item?.data.Customer?.id === selectedId?.data.Customer?.id
                  ? 'bg-[#cea0a0]'
                  : ''
              }`}
              onPress={() => setSelectedId(item)}>
              <FlatListCar
                title={item?.data.Customer?.name}
                destination={item?.data.destination?.description}
                origin={item?.data.origin?.description}
                price={item?.data.cardetails?.price}
              />
            </TouchableOpacity>
          )}
        />
        <View className=" absolute bottom-0 flex flex-col items-center w-full h-[20%] justify-end bg-white ">
          <Button
            className="mb-2 h-[70%] w-[60%] rounded-[20px]"
            onPress={AcceptBooking}>
            <Text className="text-xl font-semibold text-white h-full">
              Book Ride now
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default BookScreen;
