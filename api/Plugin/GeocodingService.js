const axios = require('axios');

class GeocodingService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getCoordinateResponse(address) {
        console.log("Định vị bằng GeocodingService:");
        console.log(`${this.apiKey}`);
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.apiKey}`;
        const response = await axios.get(apiUrl);
        return response.data;
    }
}

module.exports = GeocodingService;