import express from 'express';

var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express + TypeScript' });
});

export default router;
