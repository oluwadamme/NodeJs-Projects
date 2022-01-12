const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})



// creating a new user which is an instance for our model
// 'new' is a constructor function for our model
// const me = new User({
//     name: 'Abisola',
//     email: 'Abisola@gMAIL.com  ',
//     password:'test1234 '
// })

// me.save().then((result) => {
//     //console.log(me)
//     console.log(result);
// }).catch((error) => {
//     console.log('Error: ',error);
// });

// const task = new Tasks({
//     description: "Finish this course     ",
//     //completed: true
// })

// task.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error);
// });

