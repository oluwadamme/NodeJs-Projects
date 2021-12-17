const fs = require('fs')

const book = {
    title:'Ego is the Enemy',
    author:'Zuzu Meme'
}

// const bookJSON= JSON.stringify(book) //it takes in object or array and convert it to json string
// fs.writeFileSync('./1-json.json',bookJSON)
// console.log(bookJSON)

// const bookString = JSON.parse(bookJSON) // it converts json object to string object
// console.log(bookString.title)

// const dataBuffer = fs.readFileSync('./1-json.json')
// console.log(dataBuffer.toString())

const dataString = JSON.parse(fs.readFileSync('./1-json.json').toString())

dataString.name = 'Andrew'
dataString.age = '25'
const dataJSON = JSON.stringify(dataString)
fs.writeFileSync('./1-json.json',dataJSON)



