const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const log = console.log;
const geo_code = require("./utils/geocode");
const fore_cast = require("./utils/forecast");

//----set up paths for express config------------------
const public_path = path.join(__dirname,"../public");
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//-------set view engine for handelbars---------------
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
//-----------set static website ---------------------
app.use(express.static(public_path));


//creating a route
app.get("",(req,res)=>{
    res.render("webApp.hbs",{
        title: "index page",
        name: "saikat chatterjee"
    });
})

app.get('/weather',(req,res)=>{
    const output ={};
    if(!req.query.address){
        return res.send({
            err: "please provide an address",
            name: "saikat chatterjee"
        });

    }else{
        geo_code.geocode(req.query.address,(err,{country,name,latitude,longitude}={})=>{
            if(err){
                return res.send({err});
            }else{
                const location = `Country ${country}, location ${name}.`;
                fore_cast.forecast(latitude,longitude,(err,{localtime,country,tempC,weather_desc,humidity}={})=>{
                    if(err){
                        return res.send({err});
                    }else{
                        return res.send({
                            address: req.query.address,
                            location,
                            country,
                            tempC,
                            weather_desc,
                            humidity,
                            localtime,
                        });
                       

                    }
                })
                
                
            }
            
        })
    }
    
    
})


//define port name
app.listen(port=3000,()=>{
    log("listing on port"+port);
})