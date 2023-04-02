const router = require('express').Router();
const List = require ("../models/List")
const Client = require ("../models/Client")

router.get('/', async (req, res, next) => {
    try {
      const lists = await List.find();
      res.status(200).json(lists);
    } catch (error) {
      next(error)
    }
  });
 

// @desc    Create a new client
// @route   POST /client
// @access  Private


router.post('/list', (req, res, next) => {
    const {  user, client } = req.body;
    List.create({  user, client })
        .then(response => res.json(response))
        .catch(err => res.json(err));
  });


module.exports = router;