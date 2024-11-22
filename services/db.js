import mysql from 'mysql2';

// import dotenv from 'dotenv';

// dotenv.config();


var pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'admin',
    database: 'voucher',
    allowPublicKeyRetrieval: true
});


const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};



export { pool, getConnection };
