import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
export class LocationService {
  static getMyLocation = (): Promise<GeolocationResponse> => {
    const config = {enableHighAccuracy: true, timeout: 30000, maximumAge: 1000};
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error.message);
        },
        config,
      );
    });
  };
}

// let watchID: number | null = null;

// useEffect(() => {
//   const requestLocationPermission = async () => {
//     console.log('request Location');
//     if (Platform.OS === 'ios') {
//       getOneTimeLocation();
//       subscribeLocationLocation();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Access Required',
//             message: 'This App needs to Access your location',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           getOneTimeLocation();
//           subscribeLocationLocation();
//         } else {
//           setLocationStatus('Permission Denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };

//   requestLocationPermission();

//   return () => {
//     if (watchID !== null) {
//       Geolocation.clearWatch(watchID);
//     }
//   };
// }, []);

// const getOneTimeLocation = () => {
//   setLocationStatus('Getting Location ...');
//   Geolocation.getCurrentPosition(
//     //Will give you the current location
//     position => {
//       console.log('get position success');
//       setLocationStatus('You are Here');
//       const currentLongitude = position.coords.longitude;
//       //getting the Longitude from the location json
//       const currentLatitude = position.coords.latitude;
//       //getting the Latitude from the location json
//       console.log(position);
//       const currentDescription = JSON.stringify(
//         position.coords.altitudeAccuracy,
//       );

//       dispatch(
//         setOrigin({
//           location: {lat: currentLatitude, lng: currentLongitude},
//         }),
//       );
//     },
//     error => {
//       setLocationStatus(error.message);
//       console.log(error.message);
//     },
//     {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
//   );
// };

// const subscribeLocationLocation = () => {
//   const watchID = Geolocation.watchPosition(
//     position => {
//       setLocationStatus('You are Here');
//       //Will give you the location on location change
//       console.log(position);
//       const currentLongitude = position.coords.longitude;

//       const currentLatitude = position.coords.latitude;

//       dispatch(
//         setOrigin({
//           location: {lat: currentLatitude, lng: currentLongitude},
//         }),
//       );
//     },
//     error => {
//       setLocationStatus(error.message);
//     },
//     {enableHighAccuracy: false, maximumAge: 1000},
//   );
// };
