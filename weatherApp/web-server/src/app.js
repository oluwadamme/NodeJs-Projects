const express = require('express');
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs') // it is used to set a value in a given express value
app.set('views', viewsPath) // this is used to change the express lookup directory from views to another one
hbs.registerPartials(partialsPath)

// it is used to customise your server or setup static directory to serve
app.use(express.static(publicDirPath))

// this is used when users try to get resources from a url
app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Dammy'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Dammy'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help is here',
        value: 'Dammy'
    })
})

app.get('/weather', (req, res)=>{
    const address = req.query.address
    if (!req.query.address) {
        return res.send({
            error:'Kindly input your address'
        })
    }
    geocode(address, (error, {latitude,longitude,location}={})=>{
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                forecast: forecastData,
                address: address,
                location: location
            })
        })
    })
    
})

app.get('/products', (req,res)=>{
    //console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error:'Kindly input search query'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        name:'Dammy',
        title:'404',

        error:'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        name:'Dammy',
        title:'404',
        error:'404 - Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port' + port)
})
