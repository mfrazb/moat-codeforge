const express = require('express');

const userController = require('../Controllers/userController');
const cookieController = require('../Controllers/cookieController');
const sessionController = require('../Controllers/sessionController')

const router = express.Router();

// adding return as best practice
// go to login page -> check if a session exists based on your browser cookie -> if it does exist  (add some conditionals) verify user  middleware and go to main page

router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession,
 (req, res) => {
    return res.status(200).json({redirect:true})
})

// adding return as best practice
router.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, 
    (req, res) => {
    return res.status(200).json({redirect:true});
})






module.exports = router;