
const mysql = require('mysql2');
// Create the connection pool. The pool-specific settings are the defaults
const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', //password
  database: 'express_mysql',
});

module.exports = dbPool.promise()