import React from 'react';
import api from '../../services/api';
import { API } from '../../constants/API';
import { UserService } from '../../services/user/UserService';

export type UserInformation = {
  id: string,
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
    id: "",
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
  private id: string = '';

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

      this.information = {
        tel: res.data[0].tel,
        name: res.data[0].name,
        ava: res.data[0].ava,
        id: res.data[0].id,
        acc: res.data[0].acc,
        brandname: res.data[0].brandname,
        cmnd: res.data[0].cmnd,
        vehicleid: res.data[0].vehicleid,
        vehicletype: res.data[0].vehicletype,
        free: res.data[0].free
      };

      this.id = tel;

      return Promise.resolve(this.information);

    } catch (error) {
      return Promise.reject("Error when getting information");
    }
  }
}
