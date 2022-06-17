const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=ef8a48671b69b39c9422310a82bfb3da&query=" + latitude + "," + longitude + "&units=m"

    request({url, json : true }, (error,{body}={}) => {
            if(error){
                callback("Unable to connect to the Weather Server.",undefined);
            } else if(body.error){
                callback("Unable to find location.", undefined);
            } else {
                const curr = body.current
                callback(undefined,{
                    CurrentTemp: curr.temperature,
                    PrecipitationChance: curr.precip
                })
            }
            
        })
}

module.exports = forecast
