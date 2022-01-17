const mongoose = require('mongoose');

// This model is use for validation
const Task = mongoose.model('Task',{
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // this is the same as the one used in creating the user model for mongoose
    }
})

module.exports = Task