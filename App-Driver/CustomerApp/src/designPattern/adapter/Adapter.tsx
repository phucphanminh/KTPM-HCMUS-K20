import {UserInformation} from '../../appData/user/User';
import {formatDatabaseTimestamp, hash} from '../../helpers/validate';
import {CreateRide} from '../../services/ride/RideService';
import {FormFieldSignUp} from '../../services/user/UserService';
import {CreateRideForm} from '../../views/BookScreen';

type SignUpData = {
  driverTel: string;
  driverPass: string;
  driverName: string;
  driverAva: string;
  driverAcc: string;
  driverVehicleID: string;
  driverVehicleType: string;
  driverBrandName: string;
  driverCMND: string;
};
export type Ride = {
  id: string;
  use_id: string | null;
  cus_id: string | null;
  dri_id: string;
  driver_name: string;
  customer_name: string | null;
  appuser_name: string | null;
  pickup: string;
  dropoff: string;
  status: number;
  booktime: string;
  price: number;
  reservedtime: string | null;
};

export class Adapter {
  static userInformation(responseData: any): UserInformation {
    return {
      tel: responseData[0].tel.trim() || '',
      name: responseData[0].name.trim() || '',
      ava: responseData[0].ava || '',
      acc: responseData[0].acc.trim() || '',
      brandname: responseData[0].brandname.trim() || '',
      vehicletype: responseData[0].vehicletype.trim() || '',
      vehicleid: responseData[0].vehicleid.trim() || '',
      cmnd: responseData[0].cmnd.trim() || '',
      free: !!responseData[0].free,
    };
  }
  static getRide(responseData: any): Array<Ride> {
    const result = new Array<Ride>();

    responseData &&
      responseData.forEach((ride: Ride) => {
        result.push({
          id: ride.id.trim() || '',
          use_id: ride.use_id?.trim() || '',
          cus_id: ride.cus_id?.trim() || '',
          appuser_name: ride.appuser_name?.trim() || '',
          customer_name: ride.customer_name?.trim() || '',
          driver_name: ride.driver_name.trim() || '',
          dri_id: ride.dri_id.trim(),
          pickup: ride.pickup,
          dropoff: ride.dropoff,
          booktime: formatDatabaseTimestamp(ride.booktime),
          price: ride.price,
          reservedtime: null,
          status: ride.status,
        });
      });

    return result;
  }
  static signUp(data: FormFieldSignUp): SignUpData {
    return {
      driverAva: '',
      driverName: data.driverName.trim() || '',
      driverTel: data.driverTel.trim() || '',
      driverPass: data.driverPass.trim() || '',
      driverAcc: data.driverAcc.trim() || '',
      driverBrandName: data.driverBrandName.trim() || '',
      driverCMND: data.driverCMND.trim() || '',
      driverVehicleID: data.driverVehicleID.trim() || '',
      driverVehicleType: data.driverVehicleType.trim() || '',
    };
  }
  static createRide(data: CreateRideForm): CreateRide {
    const currentTime = new Date().toISOString();
    const combinedString = data.driverTel + data.userTel + currentTime;
    const id = hash(combinedString);

    return {
      rideID: id,
      userID: data.userTel,
      cusID: null,
      driverID: data.driverTel,
      pickupLocation: data.pickupLocation,
      dropOffLocation: data.dropOffLocation,
      bookTime: currentTime,
      price: data.price,
      reservedTime: null,
    };
  }
}
