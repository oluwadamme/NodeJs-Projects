const express = require('express');
const router = express.Router()
const User = require('../models/user')

// Users endpoints creation
// 'request, req' is to collect data from the frontend user
// 'response, res' is to send data from the backend
// Create resource(router.post())
// Read resources (router.get())
// Update resource (router.patch())
// Delete resource (router.delete())

router.post('/users', async(req, res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Read resources
router.get('/users',async(req,res)=>{
    try {
      const result = await  User.find({})
       res.send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/users/:id', async(req,res)=>{
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).send('Cannot find user with '+_id)
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})

router.patch('/users/:id', async(req,res)=>{
    // add an error handling function

    const updates = Object.keys(req.body) // this is to convert the request body to an array of strings
    const allowedUpdates = ['name', 'email', 'password', 'age'] // these are allowed parameters users can update
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // This function checks if the parameter(s) to be updated is valid
    
    if (!isValidOperation) {
        return res.status(404).send({error:'Invalid parameter(s) to update'})
    }
    try {
        const user =await User.findByIdAndUpdate(req.params.id,req.body,{ new:true,runValidator:true})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/users/:id', async (req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send({error: 'user with id ('+req.params.id.toString()+') not found'})
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router