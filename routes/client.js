const router = require('express').Router();
const Client = require ("../models/Client")
const Task = require ("../models/Task")

router.get('/', async (req, res, next) => {
    try {
      const clients = await Client.find();
      res.status(200).json(clients);
    } catch (error) {
      next(error)
    }
  });


  

// @desc    Create a new client
// @route   POST /client
// @access  Private


router.post('/client', (req, res, next) => {
    const { name, surname, phone, email, photo, bill } = req.body;
    Client.create({ name, surname, phone, email, photo, bill })
        .then(response => res.json(response))
        .catch(err => res.json(err));
  });


// @desc    Get a client by ID
// @route   GET /client/:id
// @access  Private

  router.get('/client/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const client = await Client.findById(id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  });

// @desc    Update a client by ID
// @route   PUT /client/:id
// @access  Private


  router.put('/client/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const client = await Client.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  });

// @desc    Delete a client by ID
// @route   DELETE /client/:id
// @access  Private

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    next(error);
  }
});





module.exports = router;