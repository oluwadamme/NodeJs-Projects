const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoib2x1d2FkYW1tZSIsImEiOiJja3hnN2tpNDIwcjZsMnBucHdnYTdxdmpkIn0.8QoesE7xce8cM4VseoKtjg&limit=1'
    request({url, json:true}, (error,{body})=>{
    if (error) {
        callback('Unable to access Geocoding service!', undefined)
    } else if (body.error) {
        callback(body.error.info, undefined)
    } else if (body.features.length === 0){
        callback('Location is invalid',undefined)
    } else{
    const lng = body.features[0].center[0]
    const lat = body.features[0].center[1]
    const place_name = body.features[0].place_name
    callback(undefined, {longitude:lng ,latitude: lat,location: place_name})}
})
}

module.exports = geocode