const input = document.querySelector('.weather__input')
const btn = document.querySelector('.weather__btn')
const warning = document.querySelector('.weather__warning')
const cityName = document.querySelector('.weather__city-name')
const photo = document.querySelector('.weather__icon')
const weather = document.querySelector('.weather__info-weather')
const temperature = document.querySelector('.weather__info-temperature')
const humidity = document.querySelector('.weather__info-humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=0965f43453f1351623cee65daf99cbb6';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || 'Warsaw';
	const URL = API_LINK + city + API_KEY + API_UNITS;

    
    axios.get(URL)
    .then(res=> {
        warning.textContent = ''
        cityName.textContent = res.data.name
        const status = Object.assign({},...res.data.weather)
         weather.textContent = status.main
        temperature.textContent = Math.floor(res.data.main.temp) + '°C'
        humidity.textContent = Math.floor(res.data.main.humidity) + '%'

        
        if (status.id >= 200 && status.id <= 233) {
            photo.setAttribute('src', './img/thunderstorm.png');
        } else if (status.id >= 300 && status.id <= 321) {
            photo.setAttribute('src', './img/drizzle.png');
        } else if (status.id == 500) {
            photo.setAttribute('src', './img/drizzle.png');
        } else if (status.id >= 501 && status.id <= 531) {
            photo.setAttribute('src', './img/rain.png');
        } else if (status.id >= 600 && status.id <= 621) {
            photo.setAttribute('src', './img/ice.png');
        } else if (status.id >= 701 && status.id <= 781) {
            photo.setAttribute('src', './img/fog.png');
        } else if (status.id >= 800 && status.id <= 802) {
            photo.setAttribute('src', './img/sun.png');
        } else if (status.id >= 803 && status.id <= 804) {
            photo.setAttribute('src', './img/cloud.png');
        } else {
            photo.setAttribute('src', './img/unknown.png');
        }


        input.value = ''
        
    })
    .catch(()=>{
        warning.textContent = `Wpisz poprawną nazwę miasta`
        input.value = ``
    })
}

const enterK = (e) => {

    if(e.key === 'Enter'){
        getWeather()
    }
    
}

btn.addEventListener('click',getWeather)
window.addEventListener('DOMContentLoaded',getWeather)
window.addEventListener('keyup',enterK)