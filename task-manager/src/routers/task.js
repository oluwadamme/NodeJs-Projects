const express = require('express');
const router = express.Router()
const Task = require('../models/task')

// Task resources handler
// Create resource(router.post())
// Read resources (router.get())
// Update resource (router.patch())
// Delete resource (router.delete())

router.post('/tasks', async(request, response)=>{
    const task = new Task(request.body)

    try {
        await task.save()
        response.status(201).send(task)
    } catch (error) {
        response.status(400).send(error.message)
    }
})

router.get('/tasks',async(req,res)=>{

    try {
        const task = await Task.find({})
        res.send(task)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(400).send('Cannot find task with '+_id)
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/tasks/:id', async(req,res)=>{
    const updates = Object.keys(req.body) // this is to convert the request body to an array of strings
    const allowedUpdates = ['description', 'completed'] // these are allowed parameters users can update
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // This function checks if the parameter(s) to be updated is valid
    
    if (!isValidOperation) {
        return res.status(404).send({error:'Invalid parameter(s) to update'})
    }
    try {
        const task =await Task.findByIdAndUpdate(req.params.id,req.body,{ new:true,runValidator:true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/tasks/:id', async (req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send({error: 'user with id ('+req.params.id.toString()+') not found'})
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router