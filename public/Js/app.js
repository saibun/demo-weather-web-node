

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
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weather_form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const address = submit_value.value;
    fetch("http://localhost:3000/weather?address="+address).then((res)=>{
    res.json().then((data)=>{
        console.log(data);
        if(data.err){
            messageOne.textContent = data.err;
        }else{
            messageTwo.textContent = data.address+", "+data.location+", "+data.forecast_info;
        }
    })
})
    
})

