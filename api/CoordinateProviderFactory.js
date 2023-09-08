const GeocodingService = require('./Plugin/GeocodingService'); 
const GoongService = require('./Plugin/GoongService');
require('dotenv').config();

class CoordinateProviderFactory {
    constructor() {
        this.geocodingService = new GeocodingService(process.env.GEOCODING_API_KEY);
        this.goongService = new GoongService(process.env.GOONG_API_KEY);
    }

    createProvider(providerType) {
        if (providerType === "goongProvider") {
            // console.log(this.goongService.apiKey);
            return this.goongService;
        } else {
            // console.log(this.geocodingService.apiKey);
            return this.geocodingService;
        }
    }
}

module.exports = CoordinateProviderFactory;