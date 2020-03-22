const request = require('request');
const geocode = (address,callback)=>{
    // console.log('address geocode:',address)
    const geo_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoieW9nZXNoa2F0dGlsYXRoIiwiYSI6ImNrN2dtajZldjAxNGMzZ3Bsbmc3ejFqbDIifQ.wDxhkujLfpsGlU-1pWqUaw";
    request({url:geo_url, json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location service',undefined);
        }else if(response.body.features.length == 0){
            callback('unable to find location. Try another search',undefined);
        }else{
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    });
}
module.exports = geocode;