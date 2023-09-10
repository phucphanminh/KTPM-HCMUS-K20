const CryptoJS = require('crypto-js');

class CustomerInfoDTO {
  constructor(customer, origin, destination, cardetails, coordinateProviderType) {
    this.ID = this.generateId(customer, origin, destination);
    this.Customer = customer;
    this.origin = origin;
    this.destination = destination;
    this.cardetails = cardetails;
    this.coordinateProviderType = coordinateProviderType;
  }

  generateId(customer, origin, destination) {
    const currentTime = new Date().toISOString();
    const combinedString = customer.tel + origin.description + destination.description + currentTime;

    try {
      const hash = CryptoJS.SHA256(combinedString);
      const hashBytes = hash.toString(CryptoJS.enc.Hex);
      return hashBytes.substring(0, 15); // Lấy 15 ký tự đầu
    } catch (error) {
      throw new Error("SHA-256 algorithm not found");
    }
  }
}

class Customer {
  constructor(tel, name) {
    this.tel = tel;
    this.name = name;
  }
}

class Position {
  constructor(description, lat, lng) {
    this.description = description;
    this.location = new Location(lat, lng);
  }
}

class Location {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
}

class CarDetails {
  constructor(price, genre) {
    this.price = price;
    this.genre = genre;
  }
}

module.exports = {
  CustomerInfoDTO,
  Customer,
  Position,
  Location,
  CarDetails,
};
