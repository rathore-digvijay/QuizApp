/*
 * File: app.js
 * Project: jwttoken
 * File Created: Friday, 17th April 2020 3:27:27 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */
const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

// const bodyParser = require('body-parser');
const normalRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');
const db = require('./database/mongoConnection.js');

const app = express();
app.use(express.json());

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', normalRouter);
app.use('/auth', authRouter);

// used to allow http request on server(eg.for sending mail) if this is set to 1 then
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
process.title = 'QuizApp';

// Initialize database connections etc.
db.init((dbError) => {
    if (dbError) {
        process.exit();
    }
});

// catch 404 and forwarding to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
    });
});


module.exports = app;
