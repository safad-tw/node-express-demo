const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose')



const courseSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength:5
    }
})


const Course = mongoose.model('Course', courseSchema)

router.get('/', async (req, res) => {
    const genres = await Course.find().sort('name');
    res.send(genres)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const course = await Course.findById(id)
    if (!course) res.status(404).send('The course not found');
    res.send(course)
});


router.post('/', async (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    const course = new Course({name:req.body.name})
    const resultCourse  = await course.save();
       
    // courses.push(course)
    res.send(resultCourse)
});


router.put('/:id', async (req, res) => {
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }
    const id = req.params.id
    const course = await Course.findByIdAndUpdate(id, {name: req.body.name}, {new:true});
    

    if (!course) {return res.status(404).send('The course not found');}

    res.send(course)
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const course = await Course.findByIdAndRemove(id)
    if (!course) {
        res.status(404).send('The course not found');
        return
    }
    res.send(course)
});

module.exports = router