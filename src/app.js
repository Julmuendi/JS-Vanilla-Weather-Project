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
    celsiusTemperature=response.data.main.temp; 
    let temperatureElement=document.querySelector("#temp");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
    let cityElement=document.querySelector("#city");
    let skyDescriptionElement=document.querySelector("#skydescription");
    skyDescriptionElement.innerHTML=response.data.weather[0].description;
    cityElement.innerHTML=response.data.name;
    let dateElement=document.querySelector("#date");
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    iconElement=document.querySelector("#icon");
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    
}



function search(city){
    let apiKey="ce735fca9b371504301605240e8fbfe8";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    
    axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}
let celsiusTemperature=null;

let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);



function fahrenheitConversion(event){
    event.preventDefault();
    fahrenheitConversionLink.classList.add("active");
    celsiusConversionLink.classList.remove("active");
    let temperatureElement=document.querySelector("#temp");
    temperatureElement.innerHTML=Math.round((celsiusTemperature*9)/5 + 32);
}
function displayCelsius(event){
    event.preventDefault();
    celsiusConversionLink.classList.add("active");
    fahrenheitConversionLink.classList.remove("active");
    let temperatureElement=document.querySelector("#temp");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let fahrenheitConversionLink=document.querySelector("#fahrenheit-link");
fahrenheitConversionLink.addEventListener("click",fahrenheitConversion);

let celsiusConversionLink=document.querySelector("#celsius-link");
celsiusConversionLink.addEventListener("click",displayCelsius);


search("Nairobi")