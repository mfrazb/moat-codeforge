const { Pool } = require('pg');

PG_URI = 'postgres://yjmzhpem:2W9oYq4aPozZpJpHm5UobJzjiZAvZcU-@rajje.db.elephantsql.com/yjmzhpem'

const pool = new Pool({
    connectionString: PG_URI
}); 





module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};