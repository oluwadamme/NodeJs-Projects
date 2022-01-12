const express = require('express');
require('./db/mongoose') //this line ensures that our mongoose automatically connects to the db
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// resource creation
// 'request, req' is data from the frontend user
// 'response, res' is data from the backend
app.post('/users',(req, res)=>{
    const user = new User(req.body)

    user.save().then((result) => {
        res.status(201).send(result)
    }).catch((error) => {
       res.status(400).send(error.message)
    });
})

app.post('/tasks',(request, response)=>{
    const task = new Task(request.body)

    task.save().then((result) => {
        response.status(201).send(result)
    }).catch((err) => {
        response.status(400).send(err.message)
    });
})

app.listen(port, ()=>{
    console.log('Server is up on port '+ port);
})