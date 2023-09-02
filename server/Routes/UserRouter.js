const express = require('express');

const userController = require('../Controllers/userController');

const router = express.Router();

router.post('/login', userController.verifyUser, (req, res) => {
    res.status(200).json({ message: 'Logged In'})
})

router.post('/signup', userController.uniqueInput, userController.createUser, (req, res) => {
    return res.status(200).json({message: 'User created successfully'});
})






module.exports = router;