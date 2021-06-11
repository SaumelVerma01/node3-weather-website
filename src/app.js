const { response } = require('express')
const path = require('path')
const express = require('express')
const { request } = require('http')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { title } = require('process')

const app = express()
const port = process.env.PORT || 3000

//Defining paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handle bars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(request,response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Saumel Verma'
    })
})

app.get('/about',(request,response) => {
    response.render('about', {
        title: 'About Me',
        name: 'Saumel Verma'
    })
})

app.get('/help',(request,response) => {
    response.render('help', {
        Message: 'To get the weather of a location ,type the name of the location in search box and click on the search button.',
        title: 'Help',
        name: 'Saumel Verma'
    })
})

app.get('/weather',(request,response) => {
    if(!request.query.address) {
        return response.send({
            error: 'Please provide a location'
        })
    }
    
    geocode(request.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return response.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return response.send({ error })
            }
            response.send({
                forecast: forecastData,
                location,
                address: request.query.address
            })
        })
    })
        // response.send({
        //     forecast: 'Under work',
        //     location: 'Jhansi',
        //     address: request.query.address
        // })
})

app.get("/products",(request,response)=>{
    if(!request.query.search) {
        response.send({
            error:'You must provide a search term'
        })
    } else {
        console.log(request.query.search)
        response.send({
            products:[]
        })
    }
})

app.get('/help/*' , (request,response) => {
    response.render('404', {
        title: '404',
        name: 'Saumel Verma',
        errormessage: 'Help article not found'
    })
})

app.get('*', (request,response) => {
    response.render('404', {
        title : '404',
        name: 'Saumel Verma',
        errormessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('It works!,port number:' + port)
})