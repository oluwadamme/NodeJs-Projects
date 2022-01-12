const mongoose = require('mongoose');
const validator = require('validator');

// This model is use for validation
const Task = mongoose.model('Tasks',{
    description:{
        type: String,
        required: true,
        trim: true,
    },
    completed:{
        type: Boolean,
        default: false
    }
})

module.exports = Task