class Location {
  constructor(lat, lng) {
    this._lat = lat;
    this._lng = lng;
  }

  get lat() {
    return this._lat;
  }

  set lat(lat) {
    this._lat = lat;
  }

  get lng() {
    return this._lng;
  }

  set lng(lng) {
    this._lng = lng;
  }
}

class Geometry {
  constructor(location) {
    this._location = location;
  }

  get location() {
    return this._location;
  }

  set location(location) {
    this._location = location;
  }
}

class GeocodingResult {
  constructor(geometry) {
    this._geometry = geometry;
  }

  get geometry() {
    return this._geometry;
  }

  set geometry(geometry) {
    this._geometry = geometry;
  }
}

class GeocodingResponse {
  constructor(results) {
    this._results = results;
  }

  get results() {
    return this._results;
  }

  set results(results) {
    this._results = results;
  }
}

module.exports = { GeocodingResponse, GeocodingResult, Geometry, Location };
