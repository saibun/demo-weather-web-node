//--------demo:- fetching an api-------
// fetch("https://puzzle.mead.io/puzzle").then((res)=>{
//     res.json().then((data)=>{
//         console.log(data);
//     })
// })
//---------------------------------------------
// fetch("http://localhost:3000/weather?address=kolkata").then((res)=>{
//     res.json().then((data)=>{
//         if(data.err){
//             console.log(data.err);
//         }else{
//             console.log(data.address+", "+data.location+", "+data.forecast_info);
//         }
//     })
// })
//------------------------------------------------------------------

const weather_form = document.querySelector("form");
const submit_value = document.querySelector("input");
const country_name = document.getElementById("country_name");
const location_address = document.getElementById("location");
const localtime = document.getElementById("localtime");
const forcast = document.querySelector(".forcast");
const humidity = document.getElementById("humidity");
const temp = document.querySelectorAll(".temp");
const message = document.getElementsByClassName("message")[0];

weather_form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const address = submit_value.value;
    
    fetch("http://localhost:3000/weather?address="+address).then((res)=>{

    res.json().then((data)=>{
        if(data.err){
            message.setAttribute("id","error_msg");
            error_msg.innerHTML = data.err;
            console.log(data.err);
            
        }else{
            const weather_report = data.weather_desc[0];
            country_name.innerHTML = data.country;
            location_address.innerHTML = data.address;
            localtime.innerHTML = data.localtime;
            forcast.innerHTML = weather_report;
            humidity.innerHTML = data.humidity+"%";
            for (var i = 0; i < temp.length; i++) {
                temp[i].innerHTML = data.tempC+"°C";
              }
            
        }
        
    })
})
    
})

