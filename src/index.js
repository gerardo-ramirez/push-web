const dotenv = require('dotenv');//nos permite acceder a las variables de entorno .
dotenv.config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/index'));

//static content ;
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
console.log('listen on port');