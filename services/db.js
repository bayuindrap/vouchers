import mysql from 'mysql2';



var pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password123',
    database: 'voucher',
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
