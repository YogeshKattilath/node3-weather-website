const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const api_url = 'https://api.darksky.net/forecast/fcb3adc21c8fdcdc5449529508a42d6b/'+latitude+','+longitude+'';
    request({ url: api_url, json: true }, (error, {body}) => {
        if(error){
            callback('unable to connect to weather service',undefined);
        }else if(body.error){
            callback('unable to find location ',undefined);
        }else{
            // const {} = body
            callback(undefined,{
                data:'temprature: '+body.currently.temperature
            });
        }
    });
};
module.exports = forecast;