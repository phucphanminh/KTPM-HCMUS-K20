import {API} from '../../constants/API';
import {Adapter} from '../../designPattern/adapter/Adapter';
import api from '../api';

export type CreateRide = {
  rideID: string;
  userID: string | null;
  cusID: string | null;
  driverID: string;
  pickupLocation: string;
  dropOffLocation: string;
  bookTime: string;
  price: number;
  reservedTime: string | null;
};

export class RideService {
  static getRide = async (id: string): Promise<any> => {
    try {
      const response = await api.get(API.USER.GET_RIDE + `/${id}`);
      const responseData = response?.data;

      return Promise.resolve(responseData);
    } catch (error) {
      return Promise.reject('Error in when get Ride in server');
    }
  };
  static cancelRide = async (rideId: string): Promise<any> => {
    try {
      const response = await api.post(API.USER.CANCEL_RIDE + `/${rideId}`);
      const responseData = response?.data;

      return Promise.resolve(responseData);
    } catch (error) {
      return Promise.reject('Error in when cancel Ride in server');
    }
  };
}
