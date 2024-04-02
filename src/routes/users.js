const express = require('express');

const router = express.Router();

const userService = require('../services/user-service');

/* GET users listng. */
router.get('/', (req, res) => {
  const userData = userService.getUsers();

  res.render('users', { title: 'The Sopranos', data: userData });
});

module.exports = router;
