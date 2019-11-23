const mariadb = require('mariadb');
const connection = mariadb.createPool({
     host: '10.10.1.200', 
     user:'root', 
     database:'do',
     password: 'sanjay',
     connectionLimit: 5
});
connection.getConnection()

// async function insertfunction(query) {
//      let conn;
//      try {
//         conn = await pool.getConnection();
//         const rows = await conn.query("SELECT 1 as val");
//         console.log(rows); //[ {val: 1}, meta: ... ]
//         const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//         console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
   
//      } catch (err) {
//         throw err;
//      } finally {
//         if (conn) return conn.end();
//      }
//    }

module.exports = connection;