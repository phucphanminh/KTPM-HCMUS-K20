import { Adapter } from '../../designPattern/adapter/Adapter';
import { UserService } from '../../services/user/UserService';

export type UserInformation = {
  tel: string,
  name: string,
  ava: string,
  acc: string,
  vehicleid: string,
  vehicletype: string,
  brandname: string,
  cmnd: string,
  free: boolean
};

export class User {
  private static instance: User | null = null;
  public information: UserInformation = {
    tel: "",
    name: "",
    ava: "",
    acc: "",
    vehicleid: "",
    vehicletype: "",
    brandname: "",
    cmnd: "",
    free: false
  };
  private tel: string = '';

  private constructor() {
    this.initialize();
  }

  static getInstance(): User {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }

  private initialize() {
    // You can add any additional initialization logic here if needed.
  }

  public async getInformation(tel: string): Promise<UserInformation> {
    try {
      const res = await UserService.getInformation(tel)

      this.information = Adapter.userInformation(res);

      this.tel = tel;

      return Promise.resolve(this.information);

    } catch (error) {
      return Promise.reject("Error when getting information");
    }
  }

  static isUserLogin = (): boolean => {
    return User.getInstance().tel !== ""
  };

  public signOut() {
    this.information = {
      tel: "",
      name: "",
      ava: "",
      acc: "",
      vehicleid: "",
      vehicletype: "",
      brandname: "",
      cmnd: "",
      free: false
    };

    this.tel = "";
  }
}
