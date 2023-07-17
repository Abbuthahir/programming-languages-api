const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/programminglanguage');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    // console.log('reqAction', req.query, res)
    res.json(await programmingLanguages.getMultiple(req.query.page, req.query.category));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.post('/', async function(req, res, next) {
  try {
    console.log('testPost', req.body);
    res.json(await programmingLanguages.create(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});

module.exports = router;