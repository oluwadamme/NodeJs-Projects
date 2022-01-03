const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]
if (!address) {
    return console.log('Please provide a valid address')
} else {
    // replacing 'data' with {}.. destructing the code...
    geocode(address, (error, {latitude,longitude,location})=>{
        if (error) {
            return console.log('Error: ', error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log('Error: ', error)
            }
            console.log(location)
            console.log('Data: ', forecastData)
        })
    })
    
}
