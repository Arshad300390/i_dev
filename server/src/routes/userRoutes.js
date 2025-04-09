const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/create-user', userController.createUser);

// Get all users
router.get('/get-users', userController.getAllUsers);

// Get a single user by ID
router.get('/get-user/:id', userController.getUserById);

// Update a user by ID
router.put('/update-user/:id', userController.updateUser);

// Delete a user by ID
router.delete('/delete-user/:id', userController.deleteUser);

router.post('/verify-user', userController.verifyUser);


module.exports = router;
