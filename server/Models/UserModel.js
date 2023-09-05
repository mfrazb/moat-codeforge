const { Pool } = require('pg');

PG_URI = 'postgres://yjmzhpem:2W9oYq4aPozZpJpHm5UobJzjiZAvZcU-@rajje.db.elephantsql.com/yjmzhpem'

const pool = new Pool({
    connectionString: PG_URI
}); 

// Our table for users in DB

// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   username TEXT NOT NULL UNIQUE,
//   password TEXT NOT NULL,
//   email TEXT NOT NULL UNIQUE,
//   upvotes INTEGER DEFAULT 0,
//   photo TEXT
// );

// Our table for posts in DB

// CREATE TABLE posts (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER REFERENCES users(id), -- assuming your users table is named "users"
//   upvotes INTEGER DEFAULT 0,
//   title TEXT NOT NULL,
//   link TEXT NOT NULL UNIQUE,
//   description TEXT NOT NULL,
//   category TEXT NOT NULL,
//   date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   type TEXT NOT NULL
// );



module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};