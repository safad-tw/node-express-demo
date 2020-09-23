const express = require('express');
const router = express.Router();

var courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}

]

router.get('/', (req, res) => {
    res.send(courses)
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    const course = courses.find(c => c.id === parseInt(id));
    if (!course) res.status(404).send('The course not found');

    res.send(course)
});


router.post('/', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course)
    res.send(course)
});


router.put('/:id', (req, res) => {
    const id = req.params.id
    const course = courses.find(c => c.id === parseInt(id));
    if (!course) {return res.status(404).send('The course not found');}

    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    course.name = req.body.name
    res.send(course)
});

router.delete('/api/courses/:id', (req, res) => {
    const id = req.params.id
    const course = courses.find(c => c.id === parseInt(id));
    if (!course) {
        res.status(404).send('The course not found');
        return
    }

    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(course)
});

module.exports = router