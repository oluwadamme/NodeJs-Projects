const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=140bfd0d46ef9f07970403c6bc90743e&query=6.45,3.4'
const request = http.request(url, (response) =>{
    let data = ''

    response.on('data', (chunk) =>{
        data = data + chunk.toString()
        
    })

    response.on('end', ()=>{
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error)=>{
    
    console.log(error)
})

request.end()