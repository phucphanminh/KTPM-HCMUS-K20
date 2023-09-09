import { UserInformation } from "../../appData/user/User";
import { hash } from "../../helpers/validate";
import { CreateRide } from "../../services/ride/RideService";
import { FormFieldSignUp } from "../../services/user/UserService";
import { CreateRideForm } from "../../views/BookScreen";

type SignUpData = {
	driverTel: string,
	driverPass: string,
	driverName: string,
	driverAva: string,
	driverAcc: string,
	driverVehicleID: string,
	driverVehicleType: string,
	driverBrandName: string,
	driverCMND: string,
}

export class Adapter {
	static userInformation(response: any): UserInformation {
		return {
			tel: response[0].tel.trim() || '',
			name: response[0].name.trim() || '',
			ava: response[0].ava || '',
			acc: response[0].acc.trim() || '',
			brandname: response[0].brandname.trim() || '',
			vehicletype: response[0].vehicletype.trim() || '',
			vehicleid: response[0].vehicleid.trim() || '',
			cmnd: response[0].cmnd.trim() || '',
			free: !!response[0].free,
		};
	}
	static signUp(data: FormFieldSignUp): SignUpData {
		return {
			driverAva: "",
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

		const currentTime = new Date().toISOString()
		const combinedString = data.driverTel + data.userTel + currentTime
		const id = hash(combinedString)

		return {
			driverID: data.driverTel,
			userID: data.userTel,
			dropOffLocation: data.dropOffLocation,
			pickupLocation: data.pickupLocation,
			bookTime: currentTime,
			rideID: id,
			reservedTime: null,
			cusID: null,
			price: data.price

		}
	}
}