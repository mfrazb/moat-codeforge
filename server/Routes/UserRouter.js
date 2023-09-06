const express = require('express');

const userController = require('../Controllers/userController');

const router = express.Router();

// adding return as best practice
router.post('/login', userController.verifyUser, (req, res) => {
    return res.status(200).json(res.locals.userInfo)
})

// adding return as best practice
router.post('/signup', userController.uniqueInput, userController.createUser, (req, res) => {
    return res.status(200).json({message: 'User created successfully'});
})






module.exports = router;