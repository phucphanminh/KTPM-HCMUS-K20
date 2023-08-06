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
	static  signUp= async (data:FormFieldSignUp):Promise<any>=>{
		return await api.post("API.AUTH.LOGIN", data)
			.then((res) => {
				return Promise.resolve(res.data.data)
			})
			.catch((e) => {
				return Promise.reject(e?.response?.data);
			})
	} 
	static  signIn= async (data:FormFieldSignIn):Promise<any>=>{
		return await api.post("API.AUTH.LOGIN", data)
			.then((res) => {
				return Promise.resolve(res.data.data)
			})
			.catch((e) => {
				return Promise.reject(e?.response?.data);
			})
	}
}