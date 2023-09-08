import { UserInformation } from "../../appData/user/User";
import { FormFieldSignUp } from "../../services/user/UserService";

type SignUpData = {
	userName: string,
	userTel: string,
	userPass: string,
	userAva: string,
}

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
}