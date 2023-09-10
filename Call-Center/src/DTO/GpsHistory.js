const CryptoJS = require('crypto-js');

class GpsHistory {
    constructor(tel, originDescription, latitude, longitude) {
        this.ID = this.generateId(tel, originDescription);
        this.tel = tel;
        this.originDescription = originDescription;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    generateId(tel, originDescription) {
        const currentTime = new Date().toISOString();
        const combinedString = tel + originDescription + currentTime;

        try {
            const hash = CryptoJS.SHA256(combinedString);
            const hashBytes = hash.toString(CryptoJS.enc.Hex);
            return hashBytes.substring(0, 15); // Lấy 15 ký tự đầu
        } catch (error) {
            throw new Error("SHA-256 algorithm not found");
        }
    }

    toString() {
        return `GpsHistory{id='${this.ID}', tel='${this.tel}', originDescription='${this.originDescription}', latitude=${this.latitude}, longitude=${this.longitude}}`;
    }
}

module.exports = GpsHistory;
