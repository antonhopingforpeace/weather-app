// async function locationWeatherData(location){
//     const link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DUXL5BULGRGZ8BR697PC2N7MN`;
//     const response = await fetch(link,{mode:'cors'});
//     return response;
// }

// async function processJsonLocationData(location){
//     const data = await locationWeatherData(location);
//     const response = await data.json();
//     return response;
// }

async function processLocationData(location){
    try{
        const link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DUXL5BULGRGZ8BR697PC2N7MN`;
        const weather = await fetch(link,{mode:'cors'});
        const response = await weather.json();
        return response;
    }catch(error){
        console.log("Error:",error);
        return error;
    }
    
}

function createWebpage(weather){
    details.textContent = `On ${weather.day}, at ${weather.time} the temperature in ${weather.location} is ${weather.temperature} degrees. The sky is ${weather.condition} and the location's humidity levels are ${weather.humidity}.`;
    console.log(weather);
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=NaWuuxudj811YxKyXr6CX4Diu6zKZ05G&s=${weather.condition} sky`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response){
        let promise = new Promise(function(resolve){
            setTimeout(function(){
                resolve(1);}
                ,3000);
        });
        promise.then(function(){
            img.src = response.data.images.original.url;
        })
        img.src="./wait.png";
    })

}

function buttonEvent(location){
    processLocationData(location)
    .then((response)=>{
        const weather = {
            location: response.address,
            condition: response.currentConditions.conditions,
            temperature: Math.round((response.currentConditions.temp-32)*5/9*100)/100,
            humidity: response.currentConditions.humidity,
            time: response.currentConditions.datetime,
            day: response.days[0].datetime
        }
        createWebpage(weather);
    })
    .catch((error)=>{
        details.textContent = error;
        fetch(`https://api.giphy.com/v1/gifs/translate?api_key=NaWuuxudj811YxKyXr6CX4Diu6zKZ05G&s=error`, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
        img.src = response.data.images.original.url;
        });
    })
}


const input = document.querySelector("#location");
const button = document.querySelector(".submit");
const details = document.querySelector(".info");
const img = document.querySelector("img");

button.addEventListener("click", (e)=>{
    e.preventDefault();
    buttonEvent(input.value);
});

