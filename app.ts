import createError from 'http-errors';
import helmet from "helmet";
import express, {Application, NextFunction, Request, Response} from "express";
import path from 'path';
import cookieParser from 'cookie-parser';

require('dotenv').config();

import { routeExampleToggledPages } from './src/routes';
import { routeToggles } from "./src/routes/feature-toggles";
import { routeToggledSection } from './src/routes/toggle-section';
import usersTypescriptRouter from './src/routes/users-typescript';

const app: Application = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", routeToggles);

app.use('/', routeExampleToggledPages);

app.use('/users-typescript', usersTypescriptRouter);

app.use('/toggle-section', routeToggledSection);

// catch 404 and forward to error handler
// @ts-expect-error multiple overload signatures that don't match
app.use(function(req:Response, res:Request, next: NextFunction) {
  next(createError(404));
});

export default app;
