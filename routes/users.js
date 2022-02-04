var express = require('express');
var router = express.Router();

const userService = require('../services/user-service')

router.get('/', function(req, res, next) {

  const userData = userService.getUsers();

  res.render('users', { title: 'The Sopranos', data: userData });
});

module.exports = router;
