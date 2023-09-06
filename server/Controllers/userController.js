const db = require('../Models/UserModel.js');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SALT_WORK_FACTOR = Number(process.env.SALTROUNDS);

const userController = {};


/**
 * 
 * @param {Object} req.body 
 * @param {String} req.body.username Username to add, must be unique, required
 * @param {String} req.body.password Password to add, required
 * @param {String} req.body.email Email to add, required
 * @param {Object} res.locals
 * @param {Number} res.locals.userId User id created from inserting into DB 
 * @param {Function} next When invoked without an argument, moves to next middleware
 * @returns undefined | error object
 */
userController.createUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const hashedPW = await bcrypt.hash(password, SALT_WORK_FACTOR);
        const params = [username, hashedPW, email];
        const insertUserQuery = `
        INSERT INTO users (username, password, email) 
        VALUES ($1, $2, $3)
        RETURNING id;`
        const result = await db.query(insertUserQuery, params);
        console.log(username, result.rows);
        res.locals.userId = await result.rows[0].id;
        return next();
    } catch(err) {
        return next({
            log: `userController.createUser: Error ${err}`,
            message: { err: 'Error occurred in userController.createUser'}
        });
    }
}

/**
 * @todo fix error handling for no user by still running bcrypt and not letting user know
 *       whether error was caused by username or password
 * 
 * This middleware checks a users username and password from a POST request. If
 * the user is found, it stores the user_id on res.locals.userId and moves to next middleware.
 * Otherwise it throws an error.
 * 
 * @param {Object} req.body 
 * @param {String} req.body.username
 * @param {String} req.body.password
 * @param {Object} res.locals
 * @param {Number} res.locals.userId User id created from inserting into DB 
 * @param {Function} next When invoked without an argument, moves to next middleware
 * @returns undefined | error object
 */
userController.verifyUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const params = [username];
        const verifyUserQuery = `
        SELECT * 
        FROM users 
        WHERE username = $1;`
        const databasePW = await db.query(verifyUserQuery, params);

        if(databasePW.rows.length < 1) {
            return res.status(409).json({ message: 'User not found.'});
        }
        const match = await bcrypt.compare(password, databasePW.rows[0].password);
        // res.locals.userInfo = {user: databasePW.rows}
        res.locals.userId = databasePW.rows[0].id;
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