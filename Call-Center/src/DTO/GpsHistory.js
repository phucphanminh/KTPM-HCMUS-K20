const CryptoJS = require('crypto-js');

class GpsHistory {
    constructor(phoneNumber, pickupAddress, latitude, longitude) {
        this.ID = this.generateId(phoneNumber, pickupAddress);
        this.phoneNumber = phoneNumber;
        this.pickupAddress = pickupAddress;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    generateId(phoneNumber, pickupAddress) {
        const currentTime = new Date().toISOString();
        const combinedString = phoneNumber + pickupAddress + currentTime;

        try {
            const hash = CryptoJS.SHA256(combinedString);
            const hashBytes = hash.toString(CryptoJS.enc.Hex);
            return hashBytes.substring(0, 15); // Lấy 15 ký tự đầu
        } catch (error) {
            throw new Error("SHA-256 algorithm not found");
        }
    }

    toString() {
        return `GpsHistory{id='${this.ID}', phoneNumber='${this.phoneNumber}', pickupAddress='${this.pickupAddress}', latitude=${this.latitude}, longitude=${this.longitude}}`;
    }
}

module.exports = GpsHistory;
