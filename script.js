//document-used for accessing element and is root node that manipulates webpages and dom.
//getElementById- used for accessing elemey=nt using it's id.
//addEventListener-function that is used for event handling when an event occurs,
//change-used in html input elements when event occurs it changes data.
document.getElementById("location-input").addEventListener('change', async() =>{
   //ariaValueMax-defines max value used in a range.
    const location=document.getElementById("location-input").value;
    //console.log(location);
    const weatherData=await getWeatherData(location);
   // console.log(weatherData);
    displayWeatherData(weatherData);
})
const getWeatherData=async(location)=>{
if (!location){
    return{};
}
console.log(location);
const apikey='d70388a84607c8078c8c9423c0b8343d';
const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`);

const data=await response.json();

//console.log(data);
return data;
}
function getBackgroundColor(temperature){
    console.log(temperature);
    if (temperature<0){
        return 'lightblue';
    }
    else if(temperature<10){
        return 'lightgreen';
    }     
    else if(temperature<20){
        return'lightyellow';
    }
    else if (temperature<30){
        return 'lightsalmon';
    }
    else{
        return 'lightcoral';
    }

}
const displayWeatherData=(data)=>{
    console.log(data);
    const weatherDataElement=document.getElementById("weather-data");
    if(Object.keys(data).length===0){
        weatherDataElement.innerHTML="please enter a location to see the weather";
    }
    else{
        const temperature=data.main.temp;
        //console.log(temperature);
        const backgroundColor=getBackgroundColor(Math.floor(temperature-273.15));
        weatherDataElement.style.backgroundColor=backgroundColor;
        weatherDataElement.innerHTML=`
        <h3>${data.name}</h3>
        <p>temperature:${Math.floor(temperature-273.15)}</p>
        <p>wind speed:${data.wind.speed}</p>`}
    }
window.onload=async()=>{
    const weatherData=await getWeatherData()
    displayWeatherData(weatherData)
}
