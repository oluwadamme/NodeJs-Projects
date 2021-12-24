const request = require('request')

const forecast = (longitude, latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=140bfd0d46ef9f07970403c6bc90743e&query='+latitude.toString()+','+longitude.toString()
    request({url, json:true}, (error, {body})=>{
        if (error) {
            callback('Unable to access weather service', undefined)
        } else if(body.error){
            callback(body.error.info, undefined)
        } else {
            const temp = body.current.temperature
            const feelslike = body.current['feelslike']
            callback(undefined, {Temperature:temp ,Feels_like:feelslike})
        }
    
})
}

module.exports = forecast