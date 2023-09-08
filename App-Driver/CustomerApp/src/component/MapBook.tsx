import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routers/navigationParams';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {
  selectdestination,
  selectorigin,
  selectStep,
  selectLocationCustomer,
} from '../redux/reducers';
import MapViewDirections from 'react-native-maps-directions';
import {Google_Map_Api_Key} from '@env';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'native-base';
import {useDispatch} from 'react-redux';
import {setStep} from '../redux/reducers';

import {Images} from '../configs/images';
import myTheme from './../configs/Theme';

const MapBook = () => {
  const origin = useSelector(selectorigin);
  const destination = useSelector(selectdestination);
  const locationCustomer = useSelector(selectLocationCustomer);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Step = useSelector(selectStep);

  useEffect(() => {
    if (!origin && !destination) {
      return;
    }
    if (mapRef.current) {
      (mapRef.current as any).fitToSuppliedMarkers(
        ['origin', 'destination', 'locationCustomer'],
        {
          edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        },
      );
    }
  }, [origin, destination, locationCustomer]);
  console.log(locationCustomer);
  return (
    <View className="relative">
      <MapView
        ref={mapRef}
        className="flex w-full h-[100%]"
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="your location"
            description={origin.description}
            identifier="origin"
            image={Images.CarMarker}
          />
        )}
        {/* {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="your goal"
          description={destination.description}
          identifier="destination"
        />
      )} */}
        {locationCustomer && (
          <Marker
            coordinate={{
              latitude: locationCustomer.origin.location.lat,
              longitude: locationCustomer.origin.location.lng,
            }} // Set default latitude and longitude
            title="location driver"
            identifier="locationCustomer"
          />
        )}
        {origin && locationCustomer && (
          <MapViewDirections
            origin={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            destination={{
              latitude: locationCustomer.origin.location.lat,
              longitude: locationCustomer.origin.location.lng,
            }}
            apikey="AIzaSyA3I9U2vrkhKwLoziKmNEXbzUcXdXOw630"
            strokeWidth={3}
            strokeColor={myTheme.colors.blue[500]}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapBook;
