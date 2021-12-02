var express = require('express');
var router = express.Router();

const userService = require('../services/user-service')

/* GET users listng. */
router.get('/', function(req, res, next) {

  const userData = userService.getUsers();

  res.render('users', { title: 'Users', data: userData });
});

module.exports = router;
