const APIKey = 'G97v0yvl4TodaleQF3gjOc5dZymdGhV5'
const baseUrl = 'http://dataservice.accuweather.com/'

const getCityUrl = cityname => {
    return `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityname}`
}

const getWeatherUrl = cityKey => {
    return `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`
}

const fetchData = async url => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Não foi possível obter os dados.')
        }

        return response.json()
    }
    catch({ name, message }) {
        alert(`${name}: ${message}`)
    }
}

const getCityData = cityname => fetchData(getCityUrl(cityname))
const getCityWeather = cityKey => fetchData(getWeatherUrl(cityKey))