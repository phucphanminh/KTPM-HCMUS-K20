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
