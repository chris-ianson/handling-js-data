import { Request, Response, Router } from 'express';

const router = Router();

import * as userService from '../services/user-service-typescript';
import User from "../models/User";

router.get('/', function(req:Request, res: Response) {
    userService.getUsers().then((userData: User[]) => {
      res.render('users', {title: 'The Sopranos', data: userData });
    }).catch(() => {
      res.sendStatus(404);
    });
});

router.get('/:id', function(req:Request, res: Response) {
  /**
   * TODO:
   * Improvements...
   * Add None type
   */
  userService.getUsersByID(req.params.id as unknown as number).then((userData: User | undefined) => {
    res.render('user', { title: 'User data', data: userData });
  }).catch(() => {
    res.sendStatus(404);
  });
});

export default router;
