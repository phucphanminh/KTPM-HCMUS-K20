import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

interface Coordinates {
  lat: number;
  lng: number;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
export class LocationService {
  static getMyLocation = (): Promise<GeolocationResponse> => {
    const config = { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 };
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
  static calculateDistance(origin1: Coordinates, origin2: Coordinates): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(origin2.lat - origin1.lat);
    const dLon = deg2rad(origin2.lng - origin1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(origin1.lat)) *
      Math.cos(deg2rad(origin2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  }

  // static getWatchLocation = (
  //     onLocationChange: (position: GeolocationResponse) => void,
  //     onError: (error: any) => void
  //   ): number => {
  //     const config = { enableHighAccuracy: false, maximumAge: 1000 };

  //     return Geolocation.watchPosition(
  //       onLocationChange,
  //       onError,
  //       config
  //     );
  //   };
}