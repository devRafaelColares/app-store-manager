const mysql2 = require('mysql2/promise');

const connection = mysql2.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: 'StoreManager',
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});

module.exports = connection;