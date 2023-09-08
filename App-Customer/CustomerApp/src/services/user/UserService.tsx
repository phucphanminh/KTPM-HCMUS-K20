import { Adapter } from '../../designPattern/adapter/Adapter';
import { User, UserInformation } from '../../appData/user/User';
import { API } from '../../constants/API';
import api from './../api';


export type FormFieldSignIn = {
	userTel: string,
	userPass: string,
}
export type FormFieldSignUp = {
	userName: string,
	userTel: string,
	userPass: string,
}


export class UserService {
	static signUp = async (data: FormFieldSignUp): Promise<string> => {
		try {
			const response = await api.post(API.USER.REGISTER, Adapter.signUp(data));
			
			const responseData = response?.data;

			// Check if the response data exists and has the message field
			if (responseData?.message === "Tạo tài khoản thành công") {
				return Promise.resolve(responseData.message);
			} else {
				// If the response does not have the expected data, reject the Promise with a custom error message
				return Promise.reject(responseData.message);
			}
		} catch (e) {
			// If an error occurs during the API call, reject the Promise with the error message from the API response
			return Promise.reject("Error signUp in server");
		}
	};

	static signIn = async (data: FormFieldSignIn): Promise<any> => {
		try {
			const response = await api.post(API.USER.LOGIN, data);
			const responseData = response?.data;

			// Check if the response data exists and has the message field
			if (responseData && responseData.result && responseData.result === data.userTel) {
				return Promise.resolve(responseData);
			} else {
				// If the response does not have the expected data, reject the Promise with a custom error message
				return Promise.reject(responseData.result);
			}
		} catch (e) {
			// If an error occurs during the API call, reject the Promise with the error message from the API response
			return Promise.reject("Error signIn in server");
		}
	}
	static signOut = (): void => {
		User.getInstance().signOut();
	}
	static getInformation = async (tel: string): Promise<any> => {
		try {
			const response = await api.get(API.USER.GET_INFO + `/${tel}`);
			const responseData = response?.data;
			
			if (response && response.data.length > 0) {
				return Promise.resolve(responseData)
			}
		} catch (error) {
			return Promise.reject("Error getting information in server");
		}

	}
}