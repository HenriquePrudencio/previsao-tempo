let button = document.querySelector('.search-city')
let container = document.querySelector('.search-city')
let form = document.querySelector('.form-city')
let cidade = document.querySelector('.city-name')
let date = document.querySelector('.date')
let week_day = document.querySelector('.week-day')
let icon = document.querySelector('.icon')
let text = document.querySelector('.text')
let degrees = document.querySelector('.degrees')
let feels_like = document.querySelector('.feels-like')
let temp_min = document.querySelector('.temp-min')
let temp_max = document.querySelector('.temp-max')
let wind = document.querySelector('.wind')
let humidity = document.querySelector('.humidity')

console.log(form)
form.addEventListener('submit' && 'click', (e)=>{
    e.preventDefault()
    getCurrent(button.value)
    getForecast(button.value)
})

async function getCurrent(city){
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=79de3fcf31834cbd83e220633241104&q=${city}&aqi=no`)
    let data = await response.json()
    console.log(data)
    if(data.error){
        cidade.innerHTML = '<p>Cidade não pode ser encontrada</p>'
    }else{
        cidade.innerHTML = data.location.name;
        icon.innerHTML = `<img src = "${data.current.condition.icon}">`;
        text.textContent = data.current.condition.text;
        feels_like.textContent = data.current.feelslike_c
        degrees.textContent = `${data.current.temp_c}°`;
        wind.textContent = `Vento: ${data.current.wind_kph} km/h`;
        humidity.textContent = `${data.current.humidity}%`
        date.textContent = data.current.last_updated
    }
}

async function getForecast(city){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=79de3fcf31834cbd83e220633241104&q=${city}&days=1&aqi=no&alerts=no`)
    let data = await response.json()
    console.log(data)
    if(data.error){
        cidade.innerHTML = '<p>Cidade não pode ser encontrada</p>'
    }else{
        temp_min.textContent = `${data.forecast.forecastday[0].day.mintemp_c}°`
        temp_max.textContent = `${data.forecast.forecastday[0].day.maxtemp_c}°`
    }
}