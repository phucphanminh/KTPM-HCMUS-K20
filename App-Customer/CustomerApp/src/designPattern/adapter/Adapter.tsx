import { UserInformation } from "../../appData/user/User";
import { formatDatabaseTimestamp } from "../../helpers/validate";
import { FormFieldSignUp } from "../../services/user/UserService";

type SignUpData = {
	userName: string,
	userTel: string,
	userPass: string,
	userAva: string,
}
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
	static userInformation(response: any): UserInformation {
		return {
			tel: response[0].tel.trim() || '',
			name: response[0].name.trim() || '',
			ava: response[0].ava || '',
			vip: !!response[0].vip, // Ensure that vip is a boolean
		};
	}
	static signUp(data: FormFieldSignUp): SignUpData {
		return {
			userAva: "",
			userName: data.userName || '',
			userTel: data.userTel || '',
			userPass: data.userPass || '',
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
}