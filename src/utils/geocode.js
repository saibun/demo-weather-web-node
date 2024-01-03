const request = require("request");

//sacffolding
const geo_code = {};
geo_code.geocode = (address,callback)=>{
    const url = "http://api.positionstack.com/v1/forward?access_key=782723b991cd9d034820ff467b6e5b81&query="+encodeURI(address)+"&limit=1";

    if(address.length > 30){
        //encodeURI make the empty address into string with length 39. no place with 39 letter exist so condition create if length more than 30 mean either given wrong place name or given nothing with node command.
        callback("please provide an address at cmd",undefined);

    }else{
        request({url,json:true},(err,{body})=>{
            //console.log(body);
            const {data} = body;
            //console.log(data);
            if(data == "" || data === undefined){
                callback("Unable to find the location!, Try another location",undefined);
            }
            else if(err){
                callback("unable to connect with network",undefined);
            }
            // else if(!result.data){
            //     callback("Unable to find the location!, Try another(geo)",undefined);
            // }
            
            else{
                //const data = result.data[0];
                //------------or---------------
                const {latitude, longitude, name, country} = data[0];
                // const forcast_info = {
                //     latitude: data["latitude"],
                //     longitude: data["longitude"],
                //     name: data["name"],
                //     country: data["country"],
                // }
                // ----or -------
                // const forcast_info = {
                //     latitude,
                //     longitude,
                //     name,
                //     country,
                // }
                
                //callback(undefined,forcast_info);
                //-----------------or---------------
                callback(undefined,{latitude, longitude, name, country});
    
            }
            
        })

    }
    
    
}

module.exports = geo_code;