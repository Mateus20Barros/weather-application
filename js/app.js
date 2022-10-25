const body = document.body
const form = document.querySelector('[data-js="form"]')
const flipCard = document.querySelector('[data-js="card"]')
const card = document.querySelector('[data-js="card_inner"]')
const cityCard = document.querySelector('[data-js="city_card"]')
const cityNameContainer = document.querySelector('[data-js="city_name"]')
const timeIconContainer = document.querySelector('[data-js="time_icon"]')
const changeThemeButton = document.querySelector('[data-js="change_theme"]')
const cityWeatherContainer = document.querySelector('[data-js="city_weather"]')
const weatherCitiesContainer = document.querySelector('[data-js="weather_container"]')
const cityTemperatureContainer = document.querySelector('[data-js="city_temperature"]') 

const handleThemeChange = () => {
    if (body.classList.contains('body')) {
        body.classList.toggle('change_theme')
    }
}

const isDayOrNight = IsDayTime => {
    if (IsDayTime) {
        cityCard.style.background = "url('./assets/src/day.jpg') no-repeat center"
        cityCard.style.backgroundSize = "cover"
        return
    }
    cityCard.style.background = "url('./assets/src/night.jpg') no-repeat"
    cityCard.style.backgroundSize = "cover"
}

const getWeatherInfo = (timeIcon, LocalizedName, WeatherText, Temperature) => {
    timeIconContainer.innerHTML = timeIcon
    cityNameContainer.textContent = LocalizedName
    cityWeatherContainer.textContent = WeatherText
    cityTemperatureContainer.textContent = Temperature.Metric.Value
}

const showCityWeatherInfo = async cityName => {
    const [{ Key, LocalizedName }] = await getCityData(cityName)
    const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key)
    const timeIcon = `<img src="./assets/src/icons/${WeatherIcon}.svg" />`

    getWeatherInfo(timeIcon, LocalizedName, WeatherText, Temperature)
    isDayOrNight(IsDayTime)
}

const checkInputValue = inputValue => {
    return inputValue === ''
        ? flipCard.style.display = 'none'
        : flipCard.style.display = 'block'
}

setInterval(() => card.classList.toggle('is-flipped'), 3500)

const handleSubmit = event => {
    event.preventDefault()
    const inputValue = event.target.cityname.value
    
    checkInputValue(inputValue)
    showCityWeatherInfo(inputValue)
    form.reset()
}

changeThemeButton.addEventListener('click', handleThemeChange)
form.addEventListener('submit', handleSubmit)
