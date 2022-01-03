const express = require('express');
const path = require('path');
const hbs = require('hbs')

const app = express()

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
    res.send({
        forecast: 'it is 20 degrees',
        location: 'Ile Ife'
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

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
