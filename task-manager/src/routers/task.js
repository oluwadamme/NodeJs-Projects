const express = require('express');
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

// Task resources handler
// Create resource(router.post())
// Read resources (router.get())
// Update resource (router.patch())
// Delete resource (router.delete())

router.post('/tasks',auth,async(request, response)=>{

    const task = new Task({
        ...request.body , // this will copy all the request body to the object
        owner: request.user._id
    })
    try {
        await task.save()
        response.status(201).send(task)
    } catch (error) {
        response.status(400).send(error.message)
    }
})

router.get('/tasks',auth,async(req,res)=>{

    try {
        //const tasks = await Task.find({owner:req.user._id})
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/tasks/:id', auth,async (req,res)=>{
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id})
        if (!task) {
            return res.status(400).send('Cannot find task with '+_id)
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/tasks/:id', auth, async(req,res)=>{
    const updates = Object.keys(req.body) // this is to convert the request body to an array of strings
    const allowedUpdates = ['description', 'completed'] // these are allowed parameters users can update
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // This function checks if the parameter(s) to be updated is valid
    
    if (!isValidOperation) {
        return res.status(404).send({error:'Invalid parameter(s) to update'})
    }
    try {
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id})
        
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/tasks/:id', auth, async (req,res)=>{
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send({error: 'user with id ('+req.params.id.toString()+') not found'})
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router