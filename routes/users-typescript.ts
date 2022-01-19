import { Request, Response, NextFunction, Router } from 'express';

const router = Router();

import * as userService from '../services/user-service-typescript';
import User from "../models/User";

router.get('/', function(req:Request, res: Response, next:NextFunction) {

  const userData: User[] = userService.getUsers();

  res.render('users', { title: 'The Sopranos', data: userData });
});

module.exports = router;
