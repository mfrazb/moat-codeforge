
// const { Session } = require('express-session');
const db = require('../Models/UserModel.js');

sessionController = {};


/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = async (req, res, next) => {
  const text = 'SELECT id FROM user_sessions WHERE VALUES ($1, $2)';

  };
  
/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = async (req, res, next) => {
  const text = 'INSERT INTO user_sessions (session_token, users_id) VALUES ($1, $2)';
  const params = [res.locals.number, res.locals.cookieID];
  // ? Entry should be dropped after a certain amount of time
  await db(query, params);

  return next();
    // Session.create()
};
// sessionController.startSession = async (req, res, next) => {
//     //write code here
//     const exists = await Session.findOne({cookieId: res.locals.id}).then(results => {if(results) {return true} else {return false}})
//     if(!exists){
//       await Session.create({cookieId: `${res.locals.id}`})
//       console.log("created session");
//     }
//     next();
//   };
  
//   module.exports = sessionController;


  module.exports = sessionController;
