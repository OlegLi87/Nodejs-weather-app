const request = require('request')

const forecastFunc = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/608733b45f8a9c10a8757d94888db691/' + latitude + ',' + longitude + '?units=si'
    const json = true

    request({ url, json }, (error, response) => {
        if (error) callback(error)
        else if (response.body.error) callback(response.body.error)
        else {
            const data = response.body.daily.data[0].summary + '.Current Temperature : ' + response.body.currently.temperature +
                'c.Temperature High : ' + response.body.daily.data[0].temperatureHigh + 'c.Temperature low : ' +
                response.body.daily.data[0].temperatureLow + 'c.'
            callback(undefined, data)
        }
    })
}

module.exports = forecastFunc