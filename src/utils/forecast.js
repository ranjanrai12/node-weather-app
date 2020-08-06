const request = require('postman-request');



const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5f3307759bba80193ce3828b0336bcb1&query=${lat},${long}&units=f`;
    
    // json true means there is no need to parse the string response 
    request({url, json: true}, (err, {body}) => {
        const currentData = body.current;
        // Low level error
        if (err) {
            callback("unable to connect weather service !", undefined);
        } else if (body.error) {
            callback("Unable to find location !", undefined);
        } else {
            // console.log(response.body.current);
            callback(undefined, `${currentData.weather_descriptions[0]} It is currently ${currentData.temperature}, It feels like ${currentData.feelslike} out`);
        }
    })
}


module.exports = forecast;