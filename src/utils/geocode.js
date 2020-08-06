const request = require('postman-request');

// MapBox GeoCoding
// https://docs.mapbox.com/api/search/
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFuamFuMTIiLCJhIjoiY2tjY3J2YjlzMDdrdDJzcDk3YXZ3OHN2ayJ9.8GLk4B4W1vQYMPMWHqQE5g&limit=1`;
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("unable to connect the location", undefined);
            
        } else if(body.features.length === 0 ) {
            callback("Unable to find location please search another", undefined);
        } else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;
