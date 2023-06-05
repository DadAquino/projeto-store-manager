const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWOR || 'password',
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    database: 'StoreManager',
  });

  module.exports = connection;