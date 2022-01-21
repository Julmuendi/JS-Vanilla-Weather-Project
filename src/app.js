function formatDate(timestamp){
    let date=new Date(timestamp);
    let days=["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[date.getDay()];
    let hours=date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    let minutes=date.getMinutes();
    if (minutes<10){
        minutes=`0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}
function displayWeather(response){
    let temperatureElement=document.querySelector("#temp");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
    console.log(response.data);
    let cityElement=document.querySelector("#city");
    let skyDescriptionElement=document.querySelector("#skydescription");
    skyDescriptionElement.innerHTML=response.data.weather[0].description;
    cityElement.innerHTML=response.data.name;
    let dateElement=document.querySelector("#date");
    dateElement.innerHTML=formatDate(response.data.dt*1000);
}

let apiKey="ce735fca9b371504301605240e8fbfe8";
let apiUrl=`http://api.openweathermap.org/data/2.5/weather?q=Cape Town&appid=${apiKey}&units=metric`;
console.log(apiUrl)

axios.get(apiUrl).then(displayWeather);