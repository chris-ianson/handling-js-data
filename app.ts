// noinspection TypeScriptValidateTypes

/**
 * TODO
 * - env values
 * - logging
 * - tagging
 * - coverage check
 * - build job
 */
import createError from 'http-errors';

import helmet from "helmet";

import express, {Application, NextFunction, Request, Response} from "express";

// require('dotenv').config();

// const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

import usersTypescriptRouter from './src/routes/users-typescript';

const app: Application = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users-typescript', usersTypescriptRouter);

// catch 404 and forward to error handler
// @ts-expect-error multiple overload signatures that don't match
app.use(function(req:Response, res:Request, next: NextFunction) {
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
