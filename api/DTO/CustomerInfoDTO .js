class CustomerInfoDTO {
    constructor(phoneNumber, pickupAddress, carType) {
        this.phoneNumber = phoneNumber;
        this.pickupAddress = pickupAddress;
        this.carType = carType;
        this.latitude = 0; // Khởi tạo giá trị mặc định
        this.longitude = 0; // Khởi tạo giá trị mặc định
        this.coordinateProviderType = ''; // Khởi tạo giá trị mặc định
    }
    
    // Getters và setters
    getPhoneNumber() {
        return this.phoneNumber;
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    getPickupAddress() {
        return this.pickupAddress;
    }

    setPickupAddress(pickupAddress) {
        this.pickupAddress = pickupAddress;
    }

    getCarType() {
        return this.carType;
    }

    setCarType(carType) {
        this.carType = carType;
    }

    getLatitude() {
        return this.latitude;
    }

    setLatitude(latitude) {
        this.latitude = latitude;
    }

    getLongitude() {
        return this.longitude;
    }

    setLongitude(longitude) {
        this.longitude = longitude;
    }

    getCoordinateProviderType() {
        return this.coordinateProviderType;
    }

    setCoordinateProviderType(coordinateProviderType) {
        this.coordinateProviderType = coordinateProviderType;
    }

    toString() {
        return `CustomerInfoDTO{phoneNumber='${this.phoneNumber}', pickupAddress='${this.pickupAddress}', carType='${this.carType}', latitude=${this.latitude}, longitude=${this.longitude}, coordinateProviderType='${this.coordinateProviderType}'}`;
    }
}

module.exports = CustomerInfoDTO;
