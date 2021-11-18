import { Request, Response, NextFunction, Router } from 'express';

const router = Router();

const userService = require('../services/user-service')

/* GET users listng. */
router.get('/', function(req:Request, res: Response, next:NextFunction) {

  const userData = userService.getUsers();

  res.render('users', { title: 'Users', data: userData });
});

module.exports = router;
