const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1fbca74b97e0dde13eaaac222c99b9af&query=' + latitude + ',' + longitude +'&units=m'
    request({ url, json: true}, (error,{body} = {}) => {
        if(error){
            callback('Unable to connect to weather service! Check your internet!',undefined)
        } else if(body.error) {
            callback('Unable to find location! Enter a valid location',undefined)
        } else{
            callback(undefined,'Weather: ' + body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degree Celsius out. But it feels like '+ body.current.feelslike + ' degree Celsius')
        }
    })
}

module.exports = forecast