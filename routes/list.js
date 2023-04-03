const router = require('express').Router();
const List = require('../models/List');
const isAuthenticated = require('../middlewares/jwt').isAuthenticated;

// @desc    Create a new list for a user
// @route   POST /list
// @access  Private
router.post('/', isAuthenticated, async (req, res, next) => {
  console.log("Inside POST /list handler"); // Debugging line

  try {
    const { user, client } = req.body;
    const newList = await List.create({ user, client });
    const savedList = await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    next(error);
  }
});

// @desc    Get all lists
// @route   GET /list
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const lists = await List.find().populate('user').populate('client');
    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
});

// @desc    Get list by ID
// @route   GET /list/:id
// @access  Private
router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await List.findById(id).populate('user').populate('client');
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
});

// @desc    Update list by ID
// @route   PUT /list/:id
// @access  Private
router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedList = await List.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedList) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json(updatedList);
  } catch (error) {
    next(error);
  }
});

// @desc    Delete list by ID
// @route   DELETE /list/:id
// @access  Private
router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedList = await List.findByIdAndDelete(id);
    if (!deletedList) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
