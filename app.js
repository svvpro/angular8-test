const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const app  =  express();
const mongoose = require('mongoose');
const config = require('./config/config');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false } )
    .then(()=>{console.log('Mongoose is connected...')})
    .catch((e) => {console.log(e)});

app.use(require('cors')());
app.use(require('morgan')('dev'));

app.use('/uploads', express.static('uploads'));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'));
    app.use('*', (req, res) =>{
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })
}

module.exports = app;
