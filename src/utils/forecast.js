const request = require("request");
const {forecast_key_id} = require("./key");


//module scaffolding
const fore_cast = {};

fore_cast.forecast = (latitude,longitude,callback)=>{
    if(latitude && longitude){
        const url = "http://api.weatherstack.com/current?access_key="+forecast_key_id+"&query="+encodeURI(latitude)+","+encodeURI(longitude);
    request({url,json:true},(err,{body})=>{
        if(err){
            callback("unable to connect network! ",undefined);
        }else if(body.error){
            callback("unable to find location! Try another ",undefined);

        }else{
            const {location,current} = body;
            const {localtime, country } = location;
            const {temperature: tempC, weather_descriptions: weather_desc,humidity}=current;
            callback(undefined,{localtime,country,tempC,weather_desc,humidity});
        }
    })

    }else{
        callback("missing inputs",undefined)
    }
    

}

module.exports = fore_cast;