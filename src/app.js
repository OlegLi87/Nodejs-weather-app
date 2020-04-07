const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const path = require('path')

const geocode = require('./utils/geocode.js') //relative to app.js file location
const forecast = require('./utils/forecast.js')

const portNumber = 3000

const app = express()

const viewsFolder = path.join(__dirname, '../views')
const partialsFolder = path.join(__dirname, '../views/partials')

app.set('view engine', 'hbs')
app.set('views', viewsFolder)

app.use(express.static('public')) //relative to current location in terminal!!!

hbs.registerPartials(partialsFolder)


app.get('', (req, res) => {
    res.render('index.hbs', {
        pageName: 'Home Page'
    })
})

app.get('/weather', (req, res) => {
    res.render('weather.hbs', {
        pageName: 'Weather Page',
    })

})

app.get('/weather-api', (req, res) => {
    if (!req.query.location)
        return res.send({
            error: 'location must be provided!'
        })

    let location = req.query.location;

    geocode(location, (error, { longitude, latitude, location } = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, response) => {
            if (error) res.send({ error })
            res.send({
                location,
                response
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageName: 'About Page'
    })
})

app.listen(portNumber,
    () => console.log(chalk.blue(`Express up and running!\nListening on port ${portNumber}... `)))