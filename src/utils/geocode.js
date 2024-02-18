const request = require("request");
const {geocode_key_id} = require("./key");

//sacffolding
const geo_code = {};
geo_code.geocode = (address,callback)=>{
    const url = "http://api.positionstack.com/v1/forward?access_key="+geocode_key_id+"&query="+encodeURI(address)+"&limit=1";

    if(address.length > 30){
        callback("please provide an address at cmd",undefined);

    }else{
        request({url,json:true},(err,{body})=>{
            const {data} = body;
            if(data == "" || data === undefined){
                callback("Unable to find the location!, Try another location",undefined);
            }
            else if(err){
                callback("unable to connect with network",undefined);
            }
            
            else{
                const {latitude, longitude, name, country} = data[0];
                callback(undefined,{latitude, longitude, name, country});
    
            }
            
        })

    }
    
    
}

module.exports = geo_code;