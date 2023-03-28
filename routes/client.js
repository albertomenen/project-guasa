const router = require('express').Router();
const Client = require ("../models/Client")
const Task = require ("../models/Task")
// @desc    Get all courses
// @route   GET /courses
// @access  Public
router.get('/', async (req, res, next) => {
    try {
      const clients = await Client.find();
      res.status(200).json(courses);
    } catch (error) {
      next(error)
    }
  });

// @desc    Get one client
// @route   GET /client/:clientId
// @access  Public
router.post('/client', async (req, res, next) => {
    const { name, surname, phone, email, photo, bill } = req.body;
    
    Client.create({ name, surname, phone, email, photo, bill, tasks : [] })
    .then(response => res.json(response))
    .catch(err => res.json(err));
  });






module.exports = router;