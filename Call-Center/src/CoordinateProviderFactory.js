import GeocodingService from './Plugin/GeocodingService'; 
import GoongService from './Plugin/GoongService';

// geocoding API
const GEOCODING_API_KEY='AIzaSyB2sQ1V0_MBc_QZAPvPlWHEN4FuRGGGXI0';

// goong API
const GOONG_API_KEY='tubIc8ZMj8csxNXRARKPmYaZSg9A6C5LMFHQoWiJ';

class CoordinateProviderFactory {
    constructor() {
        this.geocodingService = new GeocodingService(GEOCODING_API_KEY);
        this.goongService = new GoongService(GOONG_API_KEY);
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

export default CoordinateProviderFactory;