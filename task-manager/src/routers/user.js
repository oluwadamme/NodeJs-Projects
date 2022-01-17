const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = express.Router()
// Users endpoints creation
// 'request, req' is to collect data from the frontend user
// 'response, res' is to send data from the backend
// Create resource(router.post())
// Read resources (router.get())
// Update resource (router.patch())
// Delete resource (router.delete())


// setting up sign up endpoint for users
router.post('/users', async(req, res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// setting up login endpoint for users
router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req,res)=>{
    // this is done by removing the token the user used to login on a particular device
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
            // if this is true, it returns true and the token will removed from the tokens array
        })
        await req.user.save()
        res.send(req.user)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logoutAll', auth, async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// Read resources
router.get('/users/me',auth,async(req,res)=>{
    
    try {
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/users/me',auth, async(req,res)=>{
    // add an error handling function

    const updates = Object.keys(req.body) // this is to convert the request body to an array of strings
    const allowedUpdates = ['name', 'email', 'password', 'age'] // these are allowed parameters users can update
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // This function checks if the parameter(s) to be updated is valid
    
    if (!isValidOperation) {
        return res.status(404).send({error:'Invalid parameter(s) to update'})
    }
    try {
        //const user = await User.findById(req.user._id)
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/users/me', auth, async (req,res)=>{
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router