const mysql = require('mysql')

// const con = mysql.getConnection({
//     host: '172.17.0.2',
//     user: 'test_user',
//     password: 'test_user123',
// })
var pool = mysql.createPool({
    host: 'localhost',
    database: 'example_db',
    user: 'test_user',
    password: 'test_user123',
    connectionLimit : 10
})

module.exports = {
    selectList: (sql, handler) => {
        pool.getConnection((err, conn) => {
            if(err) {
                console.log(err.message);
                throw err;
            }

            conn.query(sql, (err, results, fields) => {
                if(err) {
                    console.log(err);
                    throw err;
                }

                handler("OK", results);
            });
        })
    }
};