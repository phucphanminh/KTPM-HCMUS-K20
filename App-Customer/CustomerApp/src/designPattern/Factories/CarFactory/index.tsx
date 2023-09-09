import {CarType} from '../../../models/Car/CarType';
import {Images} from './../../../configs/images';

interface ICar {
  countPrice(distance: number): string;
}

export type CarProps = {
  pricePerKm: number;
  image?: any;
  type?: CarType;
  detail?: string;
};

export class Car implements ICar {
  public data: CarProps;

  constructor(data: CarProps) {
    this.data = {...data};
  }

  public countPrice(distance: number): string {
    // Ensure this.data.pricePerKm is of type number
    const pricePerKm =
      typeof this.data.pricePerKm === 'number' ? this.data.pricePerKm : 0;

    // Calculate the price
    const totalPrice = pricePerKm * distance;

    // Format the price with commas for thousands separators and add the currency symbol "₫" (VND)
    const formattedPrice = totalPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'VND',
    });

    return formattedPrice;
  }
}

class Seat4Car extends Car {
  constructor(data: CarProps) {
    super(data);
    this.data.image = Images.Seat4Car;
    this.data.detail = 'Muximum 4 passengers';
    this.data.type = CarType.SEAT_4;
  }
}

class Seat7Car extends Car {
  constructor(data: CarProps) {
    super(data);
    this.data.image = Images.Seat7Car;
    this.data.detail = 'Muximum 7 passengers';
    this.data.type = CarType.SEAT_7;
  }
}

export class CarFactory {
  private static instance: CarFactory | null = null;

  private constructor() {}

  public static getInstance(): CarFactory {
    if (CarFactory.instance === null) {
      CarFactory.instance = new CarFactory();
    }
    return CarFactory.instance;
  }

  public factoryMethod(type: CarType): Car {
    const priceCarTypes = {
      [CarType.SEAT_4]: 10000,
      [CarType.SEAT_7]: 14000,
    };

    const initData: CarProps = {
      pricePerKm: 0, // Initialize pricePerKm directly
    };

    switch (type) {
      case CarType.SEAT_4:
        initData.pricePerKm = priceCarTypes[CarType.SEAT_4];
        return new Seat4Car(initData);
      case CarType.SEAT_7:
        initData.pricePerKm = priceCarTypes[CarType.SEAT_7];
        return new Seat7Car(initData);
      default:
        throw new Error('Invalid Car Type');
    }
  }
}
