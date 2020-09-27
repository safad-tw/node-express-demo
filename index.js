const mongoose = require('mongoose');
const courses = require('./routes/courses');
const express = require('express');
const app = express();

mongoose.connect('mongodb://mongo:27017/mongo-demo')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/courses', courses);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



// const courseSchema = new mongoose.Schema({
//     name: {type: String, required: true, minlength:5, maxlength:20},
//     author: String,
//     tags: {
//         type: Array,
//         validate: {
//             validator: function(v){
//                 return v && v.length > 0
//             },
//             message: 'should have at least 1 category'
//         }
//     },
//     date: {type: Date, default: Date.now}
// });

// async function createCourse() {
//     const Course = mongoose.model('Course', courseSchema)
//     const course = new Course({
//         name: 'node js',
//         author: 'safad',
//         tags: ['node', 'backend'],
//     });

//     const course1 = new Course({
//         name: 'node js1',
//         author: 'safad1',
//         tags: ['node1', 'backend1'],
//     });

//     const result = await course.save();
//     const result1 = await course1.save();
//     console.log(result);
//     console.log(result1);
// }

// async function getCourses(){
//     const courses = await Course.find({author:'safad'}).limit(10).sort({name: 1}).select({name:1, tags:1});
//     console.log(courses)
// }

// async function updateCourse(id){
//     const result = await Course.update({_id:id }, {$set: {
//       author: 'Safad'
//     }});
//     console.log(result)
// }

// async function removeCourse(id){
//     const result = await Course.deleteOne({_id:id });
//     console.log(result) 
// }

// createCourse()
// getCourses()