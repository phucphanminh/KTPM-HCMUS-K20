import { UserService } from '../../services/user/UserService';
import { Adapter } from '../../designPattern/adapter/Adapter';

export type UserInformation = {
  tel: string;
  name: string;
  ava: string;
  vip: boolean;
};

export class User {
  private static instance: User | null = null;
  public information: UserInformation = {
    tel: '',
    ava: '',
    name: '',
    vip: false,
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
      
      this.information = Adapter.userInformation(res)

      this.tel = tel;
      
      return Promise.resolve(this.information);

    } catch (error) {
      return Promise.reject("Error when getting information");
    }
  }

  static isUserLogin = ():boolean => {
    return User.getInstance().tel !== ""
  };
  public signOut(){
    this.information = {
      tel: '',
      ava: '',
      name: '',
      vip: false,
    };
    
    this.tel = "";
  }
}
