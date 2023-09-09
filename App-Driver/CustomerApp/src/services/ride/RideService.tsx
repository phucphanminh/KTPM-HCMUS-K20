import { API } from "../../constants/API"
import { Adapter } from "../../designPattern/adapter/Adapter"
import { CreateRideForm } from "../../views/BookScreen"
import api from "../api"

export type CreateRide = {
	rideID: string,
	userID: string | null,
	cusID: string | null,
	driverID: string,
	pickupLocation: string,
	dropOffLocation: string,
	bookTime: string,
	price: string,
	reservedTime: string | null
}

export class RideService {
	static createRide = async (data: CreateRideForm): Promise<any> => {
		try {
			const response = await api.post(API.DRIVER.CREATE_RIDE, Adapter.createRide(data))
			const responseData = response?.data;

			return Promise.resolve(responseData.message);

		} catch (error) {
			return Promise.reject("Error in when create Ride in server");
		}
	}
}
