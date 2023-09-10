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
import {selectRideId, showMessage} from '../redux/reducers';
import {StatusColor} from '../component/Overlay/SlideMessage';

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
import {setLocationDriver} from '../redux/reducers';
import {setStep} from '../redux/reducers';
import {Button} from 'native-base';
import {Divider} from 'native-base';
import {Google_Map_Api_Key} from '@env';
import {SocketIOClient} from '../socket';
import NotifyInformationDriver from '../component/NotifyInformationDriver';
import {User} from '../appData/user/User';
import { RideService } from '../services/ride/RideService';
type MapBookScreenProps = NativeStackScreenProps<RootStackParamList, 'MapBook'>;
const MapBookScreen: React.FC<MapBookScreenProps> = ({navigation}) => {
  const [selectedId, setSelectedId] = useState<string>();
  const step = useSelector(selectStep);
  const origin = useSelector(selectorigin);
  const rideId = useSelector(selectRideId);
  const socket = SocketIOClient.getInstance();
  const locationDriver = useSelector(selectLocationDriver);
  const [Notify, SetNotify] = useState({
    notify: false,
    name: '',
    vehicleInfo: '',
    driverId: '',
  });

  React.useEffect(() => {
    socket.emitJoinRoom(User.getInstance().information.tel);
    socket.onListenDriversLocation(data => {
      dispatch(setLocationDriver(data));
    });
    socket.onListenUpdateLocationDriver(data => {
      dispatch(setLocationDriver(data));
    });
    socket.onListenAcceptBookingSuccess(data => {
      dispatch(setLocationDriver(data));
    });

    socket.onListenPickup(data => {
      dispatch(setStep({name: data}));
    });
  }, []);
  React.useEffect(() => {
    console.log(locationDriver);
    if (locationDriver?.name) {
      SetNotify(() => ({
        notify: true,
        name: locationDriver.name,
        vehicleInfo: `${locationDriver.identify}-${locationDriver.brandName}`,
        driverId: locationDriver.driver,
      }));
    }
  }, [locationDriver]);

  React.useEffect(() => {
    SetNotify({...Notify, notify: false});
  }, [step]);

  const dispatch = useDispatch();

  return (
    <View className="relative h-full w-full">
      <MapBook />
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
      <Button
        className=" absolute top-2 right-3 w-[20%] text-center  bg-red-500 h-[5%] rounded-md"
        onPress={async () => {
          dispatch(setStep({name: 'customer cancel trip'}));
          socket.emitSendCancelTrip({
            customerId: User.getInstance().information.tel,
            driverId: locationDriver.driver,
          });

          try {
            const {message} = await RideService.cancelRide(rideId);

            dispatch(showMessage(StatusColor.success, message));
          } catch (e) {
            dispatch(showMessage(StatusColor.error, e));
          }

          navigation.navigate('Home');
        }}>
        <Text className="text-white h-full text-xs">Cancel Trip</Text>
      </Button>
      {Notify.notify && (
        <View className="absolute bottom-3 w-full h-[10%] items-center">
          <NotifyInformationDriver
            driverName={Notify.name}
            vehicleInfo={Notify.vehicleInfo}></NotifyInformationDriver>
        </View>
      )}
    </View>
  );
};

export default MapBookScreen;
