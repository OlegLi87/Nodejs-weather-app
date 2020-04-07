const request = require('request')

const geocodeFunc = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1Ijoib2xlZ2xpdmNoYSIsImEiOiJjazgxcWYzZTYwaWh3M3RtczNma2UzbzVkIn0.B3mta89EPcl-cxU3MpO46Q&limit=1'
    const json = true // automatically parses json response

    request({ url, json }, (error, response) => {
        if (error) callback(error)
        else if (response.body.features.length == 0) callback('couldnt find location')
        else {
            const data = {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocodeFunc
