const express = require('express');
const app = express();
const http = require('http');
const mysql = require('mysql');

var pool = mysql.createPool({
    // host: '172.17.0.2',
    host: 'localhost',
    database: 'example_db',
    user: 'test_user',
    password: 'test_user123',
    connectionLimit: 10
})

const host = '0.0.0.0';
const port = 3000;

app.get('/', (req, res) => {
    // console.log(req.params.dictionary);
    // console.log(`req.ip : ${req.ip}`);
    pool.getConnection((err, conn) => {
        if(err) throw err;

        conn.query('SELECT * FROM user', (err, result, fields) => {
            if(err) throw err;

            res.send(result); 
        })
    });

})

// IPv6 로 주소가 취득되어 IPv4 사용으로 변경 
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// })
// git commit push 테스트
// 충톨테스트2
http.createServer(app).listen(port, host, () => {
    console.log(`Test app listening at http://localhost:${port}`);
});