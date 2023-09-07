const express = require('express');
const db = require('../Models/UserModel.js');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userController = {};


// uniqueInput checks the user input to see if its valid
userController.uniqueInput = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const areAllStringsAndDefined = [username, email, password].every(val => typeof val === 'string' && val !== undefined);
        console.log(areAllStringsAndDefined);

        if (!areAllStringsAndDefined) {
            return res.status(400).json({ message: 'Test: Please provide all fields' });
        }

        const params = [username, email];
        const uniqueUsernameAndEmail = `SELECT id FROM users WHERE username = $1 OR email = $2;`;
        const result = await db.query(uniqueUsernameAndEmail, params);
        // check result.rows.length > 0 have to redo username or email
        if(result.rows.length > 0) {
            return res.status(409).json({ message: 'User is already in system'});
        }
        return next();
    } catch(err) {
        return next({
            log: `userController.uniqueInput: Error ${err}`,
            message: { err: 'Error occurred in userController.uniqueInput'}
        });
    }
}

// create a new user
userController.createUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const hashedPW = await bcrypt.hash(password, SALT_WORK_FACTOR);
        const params = [username, hashedPW, email];
        const insertUserQuery = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3);`
        db.query(insertUserQuery, params);
        return next();
    } catch(err) {
        return next({
            log: `userController.createUser: Error ${err}`,
            message: { err: 'Error occurred in userController.createUser'}
        });
    }
}

userController.verifyUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const params = [username];
        const verifyUserQuery = `SELECT * FROM users WHERE username = $1;`
        const databasePW = await db.query(verifyUserQuery, params);

        if(databasePW.rows.length < 1) {
            return res.status(409).json({ message: 'User not found.'});
        }
        const match = await bcrypt.compare(password, databasePW.rows[0].password);
        // res.locals.userInfo = {user: databasePW.rows}
        res.locals.userInfo = { username: databasePW.rows[0].username, userID: databasePW.rows[0].id };
        if (match) {
            return next();
        } else {
            return res.status(409).json({message: 'Username or password incorrect.'})
        }
    } catch(err) {
        return next({
            log: `userController.verifyUser: Error ${err}`,
            message: { err: 'Error occurred in userController.verifyUser'}
        });
    }
}

module.exports = userController;