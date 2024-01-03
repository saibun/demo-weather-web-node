const request = require("request");


//module scaffolding
const fore_cast = {};

fore_cast.forecast = (latitude,longitude,callback)=>{
    if(latitude && longitude){
        const url = "http://api.weatherstack.com/current?access_key=778e88a5b8539723ce788f191d2dba1d&query="+encodeURI(latitude)+","+encodeURI(longitude);
    request({url,json:true},(err,{body})=>{
        if(err){
            callback("unable to connect network! ",undefined);
        }else if(body.error){
            callback("unable to find location! Try another(fore) ",undefined);

        }else{
            // const info = {
            //     local_time: res.body.location["localtime"],
            //     tempC: res.body.current.temperature,
            //     weather_desc: res.body.current.weather_descriptions[0],
            //     country: res.body.location["country"],
            // }
            //--------or--------------
            const {location,current} = body;
            const {localtime, country } = location;
            const {temperature: tempC, weather_descriptions: weather_desc} = current;
            callback(undefined,{localtime,country,tempC,weather_desc});
        }
    })

    }else{
        callback("missing inputs",undefined)
    }
    

}

module.exports = fore_cast;