import {API} from '../../constants/API';
import {Adapter} from '../../designPattern/adapter/Adapter';
import {CreateRideForm} from '../../views/BookScreen';
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
  static createRide = async (data: CreateRideForm): Promise<any> => {
    try {
      const response = await api.post(
        API.DRIVER.CREATE_RIDE,

        Adapter.createRide(data),
      );
      const responseData = response?.data;

      return Promise.resolve(responseData);
    } catch (error) {
      return Promise.reject('Error in when create Ride in server');
    }
  };
  static getRide = async (id: string): Promise<any> => {
    try {
      const response = await api.get(API.DRIVER.GET_RIDE + `/${id}`);
      const responseData = response?.data;

      return Promise.resolve(responseData);
    } catch (error) {
      return Promise.reject('Error in when get Ride in server');
    }
  };
  static cancelRide = async (rideId: string): Promise<any> => {
    try {
      const response = await api.post(API.DRIVER.CANCEL_RIDE + `/${rideId}`);
      const responseData = response?.data;

      return Promise.resolve(responseData);
    } catch (error) {
      return Promise.reject('Error in when cancel Ride in server');
    }
  };
  static completeRide = async (rideId: string): Promise<any> => {
    try {
      const response = await api.post(API.DRIVER.COMPLETE_RIDE + `/${rideId}`);
      const responseData = response?.data;

      return Promise.resolve(responseData);
    } catch (error) {
      return Promise.reject('Error in when complete Ride in server');
    }
  };
}
