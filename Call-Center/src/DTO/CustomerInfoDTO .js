const CryptoJS = require('crypto-js');

class CustomerInfoDTO {
    constructor(phoneNumber, name, pickupAddress, dropoffAddress, carType) {
        this.ID = this.generateId(phoneNumber, pickupAddress, dropoffAddress);
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.pickupAddress = pickupAddress;
        this.dropoffAddress = dropoffAddress;
        this.carType = carType;
        this.pickUpLat = 0; // Khởi tạo giá trị mặc định
        this.pickUpLng = 0; // Khởi tạo giá trị mặc định
        this.dropOffLat = 0; // Khởi tạo giá trị mặc định
        this.dropOffLng = 0; // Khởi tạo giá trị mặc định
        this.coordinateProviderType = ''; // Khởi tạo giá trị mặc định
    }

    generateId(phoneNumber, pickupAddress, dropoffAddress) {
    const currentTime = new Date().toISOString();
    const combinedString = phoneNumber + pickupAddress + dropoffAddress + currentTime;

    try {
        const hash = CryptoJS.SHA256(combinedString);
        const hashBytes = hash.toString(CryptoJS.enc.Hex);
        return hashBytes.substring(0, 15); // Lấy 15 ký tự đầu
    } catch (error) {
        throw new Error("SHA-256 algorithm not found");
    }
    }
}

module.exports = CustomerInfoDTO;
