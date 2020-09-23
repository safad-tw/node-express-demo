
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const express = require('express');
const morgan = require('morgan');
const Joi = require('joi');
const Log = require('./middleware/logger');
const courses = require('./routes/courses')
const app = express();


app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/api/courses', courses)

console.log("app name" +  config.get('name'))

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('morgan enabled...');
    startupDebugger("debugging started")
}


app.use(function(req,res,next){
    console.log("Logging")
    next()
});

app.use(Log);


app.get('/', (req, res) => {
    res.render('index', {title:'My express', message:'hello'})
});

const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`listenig on ${port}`))