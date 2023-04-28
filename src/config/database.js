
const mysql = require('mysql2');
// Create the connection pool. The pool-specific settings are the defaults
const dbPool = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_username,
  password: process.env.db_password, //password
  database: process.env.db_NAME,
});

module.exports = dbPool.promise()