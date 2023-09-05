import { API } from '../../constants/API';
import api from './../api';


export type FormFieldSignIn={
	userTel:string,
	userPass:string,
}	
export type FormFieldSignUp={
	userName:string,
	userTel:string,
	userPass:string,
}		


export class UserService{
	static signUp = async (data: FormFieldSignUp): Promise<string> => {
		try {
		  const response = await api.post(API.USER.REGISTER, { ...data, userAva: "" });
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
		  return Promise.reject("Error in server");
		}
	  };
	  
	static  signIn= async (data:FormFieldSignIn):Promise<any>=>{
		try {
			const response = await api.post(API.USER.LOGIN, data);
			const responseData = response?.data;
		
			// Check if the response data exists and has the message field
			if (responseData && responseData.result && responseData.result === data.userTel) {
			  return Promise.resolve("Login Success");
			} else {
			  // If the response does not have the expected data, reject the Promise with a custom error message
			  return Promise.reject(responseData.result);
			}
		  } catch (e) {
			// If an error occurs during the API call, reject the Promise with the error message from the API response
			return Promise.reject("Error in server");
		  }
	}
}