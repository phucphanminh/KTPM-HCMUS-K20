const axios = require('axios');

class GoongService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getCoordinateResponse(address) {
        console.log("Định vị bằng GoongService:");
        console.log(`${this.apiKey}`);
        const apiUrl = `https://rsapi.goong.io/geocode?address=${address}&api_key=${this.apiKey}`;
        const response = await axios.get(apiUrl);
        return response.data;
    }
}

module.exports = GoongService;