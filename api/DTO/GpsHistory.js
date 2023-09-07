const crypto = require('crypto');

class GpsHistory {
    constructor(phoneNumber, address, latitude, longitude) {
        this.ID = this.generateId(phoneNumber, address);
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    generateId(phoneNumber, address) {
        const currentTime = new Date().toISOString();
        const combinedString = phoneNumber + address + currentTime;

        try {
            const hash = crypto.createHash('sha256');
            const hashBytes = hash.update(combinedString, 'utf-8').digest('hex');
            return hashBytes.substring(0, 15); // Lấy 15 ký tự đầu
        } catch (error) {
            throw new Error("SHA-256 algorithm not found");
        }
    }

    getId() {
        return this.ID;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    getAddress() {
        return this.address;
    }

    setAddress(address) {
        this.address = address;
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

    toString() {
        return `GpsHistory{id='${this.ID}', phoneNumber='${this.phoneNumber}', address='${this.address}', latitude=${this.latitude}, longitude=${this.longitude}}`;
    }
}

module.exports = GpsHistory;
