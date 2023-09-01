import React, {useRef} from 'react';
import myStyles from '../configs/styles';
import {
  Keyboard,
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Google_Map_Api_Key} from '@env';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routers/navigationParams';
import {StatusBar} from 'expo-status-bar';
import {Images} from '../configs/images';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setLoading} from './../redux/reducers';
import {Button} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Geolocation from '@react-native-community/geolocation';
import {setOrigin} from './../redux/reducers';
import Map from '../component/Map';
import {useSelector} from 'react-redux';
import {selectorigin} from './../redux/reducers';
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [currentLongitude, setCurrentLongitude] = useState();
  const [currentLatitude, setCurrentLatitude] = useState();
  const [Description, setDescription] = useState();
  const [locationStatus, setLocationStatus] = useState('');
  let watchID: number | null = null;

  useEffect(() => {
    const requestLocationPermission = async () => {
      console.log('request Location');
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();

    return () => {
      if (watchID !== null) {
        Geolocation.clearWatch(watchID);
      }
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        console.log('get position success');
        setLocationStatus('You are Here');
        const currentLongitude = position.coords.longitude;
        //getting the Longitude from the location json
        const currentLatitude = position.coords.latitude;
        //getting the Latitude from the location json
        console.log(position);
        const currentDescription = JSON.stringify(
          position.coords.altitudeAccuracy,
        );

        dispatch(
          setOrigin({
            location: {lat: currentLatitude, lng: currentLongitude},
          }),
        );
      },
      error => {
        setLocationStatus(error.message);
        console.log(error.message);
      },
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
    );
  };

  const subscribeLocationLocation = () => {
    const watchID = Geolocation.watchPosition(
      position => {
        setLocationStatus('You are Here');
        //Will give you the location on location change
        console.log(position);
        const currentLongitude = position.coords.longitude;

        const currentLatitude = position.coords.latitude;

        dispatch(
          setOrigin({
            location: {lat: currentLatitude, lng: currentLongitude},
          }),
        );
      },
      error => {
        setLocationStatus(error.message);
      },
      {enableHighAccuracy: false, maximumAge: 1000},
    );
  };
  const mapRef = useRef(null);
  const origin = useSelector(selectorigin);
  useEffect(() => {
    if (!origin) {
      return;
    }
    if (mapRef.current) {
      (mapRef.current as any).fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      });
    }
  }, [origin]);

  return (
    <View className="relative h-full w-full">
      {origin != null && (
        <MapView
          ref={mapRef}
          className=" absolute w-full h-full"
          initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="your location"
            description={origin.description}
            identifier="origin"
          />
        </MapView>
      )}
      {/* <MapView
             className=" absolute w-full h-full"
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker 
        coordinate={
          {
            latitude: 37.78825,
            longitude: -122.4324,
          }
        }
        />
      </MapView> */}

      <View className=" bottom-9  absolute h-[20%]  w-full">
        <View className="flex flex-col items-center justify-end h-full w-full ">
          <View className="flex flex-col items-center justify-start bg-[#FFFBE7] border-2 border-[#F3BD06] rounded-[15px] h-[95%] w-[90%] mb-7 ">
            {/* <View className="relative  h-[30%] w-[95%] mt-2">
              <TextInput
                className="absolute pl-[15%]  bg-[#FFFBE7] border-2 border-[#F3BD06] rounded-[10px] h-full w-full "
                editable
                onSubmitEditing={Keyboard.dismiss}
                placeholder="Input your location"
              />
              <View className=" absolute inset-y-0 left-0 flex items-start justify-center pl-3 pointer-events-none ">
                <Image source={Images.iconfind}></Image>
              </View>
            </View> */}
            <View className="relative  h-[30%] w-[95%] mt-2">
              <TextInput
                className="absolute pl-[15%]  bg-[#FFFBE7] border-2 border-[#F3BD06] rounded-[10px] h-full w-full "
                editable
                onPressIn={() => {
                  navigation.navigate('Book');
                }}
                placeholder="Where are you go"
              />
              <View className=" absolute inset-y-0 left-0 flex items-start justify-center pl-3 pointer-events-none ">
                <Image source={Images.iconfind}></Image>
              </View>
            </View>
            <Button
              className="my-2 rounded-[10px] px-5 h-[40px] w-[30%] "
              onPress={() => {
                console.log(Google_Map_Api_Key);
              }}>
              <Text className="text-white text-xs">Comfirm</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
// onPress={() => navigation.navigate('Loading')
