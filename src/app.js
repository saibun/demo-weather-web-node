const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const log = console.log;
const geo_code = require("./utils/geocode");
const fore_cast = require("./utils/forecast");

//-------demo work of path.join----------
log(path.join(__dirname,"../public"));

//----set up paths for express config------------------
const public_path = path.join(__dirname,"../public");
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//-------set view engine for handelbars---------------
app.set('views', viewPath);// gets the templetes directory which was views in past. we change the name and point out so express can understand tepletes and views are the same directory, because by default expree look views directory for handelbar.
app.set('view engine', 'hbs');//set is at it is given in hbs instlation otherwise express can't understand it
hbs.registerPartials(partialsPath);
//-----------set static website ---------------------
app.use(express.static(public_path));


//creating a route
app.get("",(req,res)=>{
    res.render("index.hbs",{
        title: "index page",
        name: "saikat chatterjee"
    });
})


// app.get("/weather",(req,res)=>{
//     if(!req.query.address){
//         return res.render("weather.hbs",{
//             title: "please provide an address",
//             name: "saikat chatterjee"
//         });

//     }
//     res.render("weather.hbs",{
//         title: req.query.address,
//         name: "saikat chatterjee"
//     })
// });

app.get('/product',(req,res)=>{
    //console.log(req.query);
    if(!req.query.pId){
        return res.send({
            message: "You must have to put a product id",
        })
    }
    res.send({
        product: [],
    })
    
})



//---due to using express.static() into app.use() it showing on default routing---
//so we don't need below 3 lines
// app.get('',(req,res)=>{
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// })
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:"saikat",
//         address: "Burdwan",

//     },
//     {
//         name:"souvik",
//         address:"berhampure",
//     }]);
// })
// app.get('/about',(req,res)=>{
//     res.send("this is about page");
// })
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
                 //log(`Country ${country}, name ${name}, latitude ${latitude}, logitude ${longitude}`);

                 const location = `Country ${country}, location ${name}.`;
                
    
                fore_cast.forecast(latitude,longitude,(err,{localtime,tempC,weather_desc}={})=>{
                    if(err){
                        return res.send({err});
                    }else{
                       // log(` localtime ${localtime}, temperature in C is ${tempC}, and weather is ${weather_desc[0]}`);

                       const forecast_info = ` localtime ${localtime}, temperature in celcius is ${tempC}, and weather is ${weather_desc[0]}`
                        return res.send({
                            address: req.query.address,
                            location,
                            forecast_info,
                        });
                    }
                })
                
                
            }
            
        })
    }
    
    
})




//------handel routes which are not exist after /weather
app.get("/weather/*",(req,res)=>{
    //res.send("No information present");
    res.render("error404",{
        error_status: 404,
        error_msg: "Weather artical not found",
        name: "saikat chatterjee",
    })
})

//----handel other routes which are not exist-----
app.get("*",(req,res)=>{
    // "*" is wild card in express which mean everything except thoes routes which are mentationed in code.
    //res.send("my 404 error");
    res.render("error404",{
        error_status: 404,
        error_msg: "page not found",
        name: "saikat chatterjee",
    })
})


//define port name
app.listen(port=3000,()=>{
    log("listing on port"+port);
})