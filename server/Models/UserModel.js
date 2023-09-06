const { Pool } = require('pg');
require('dotenv').config();

PG_URI = process.env.PG_URI
console.log('pgUri', PG_URI)
const pool = new Pool({
    connectionString: PG_URI
}); 

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};