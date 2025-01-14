const express = require('express');
const router = express.Router();
const { deleteUserById } = require('../controller/deleteUserById.controller.js');

// Delete user by ID
router.delete('/users/:id', deleteUserById);

module.exports = router;
