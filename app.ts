// noinspection TypeScriptValidateTypes

/**
 * TODO
 * - Linting
 * - git messaging
 * - helmut
 * - logging
 * - tagging
 * - type checking
 * - coverage check
 * - env values
 * - organise directories
 * - build job
 * - check libraries and fix critical errors
 */
const createError = require('http-errors');

import express, { Application, Request, Response} from "express";

// require('dotenv').config();

// const express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');

const usersTypescriptRouter = require('./src/routes/users-typescript');

const app: Application = express();

// const port = process.env.PORT;
// const test = path.join?.('test');
// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users-typescript', usersTypescriptRouter);

// catch 404 and forward to error handler
app.use(function(req:Response, res:Request, next:any) {
  next(createError(404));
});

// error handler
// app.use((err:any , req:Response , res: Response, next: any) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.listen(port, () => {
//   console.log('listening on port ' + port)
// });

export default app;
