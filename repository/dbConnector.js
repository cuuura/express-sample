const mysql = require("mysql");
const pstmt = require("yesql").mysql;

// const con = mysql.getConnection({
//     host: "172.17.0.2",
//     user: "test_user",
//     password: "test_user123",
// })

//const pool = mysql.createPool({
//    host: "localhost",
//    database: "example_db",
//    user: "test_user",
//    password: "test_user123",
//    connectionLimit : 10
//});
const pool = mysql.createPool({
    host: "192.168.0.21",
    database: "example_db",
    user: "test_user",
    password: "test_user123",
    connectionLimit : 10
});

function execquery(queryStr, done) {
    pool.getConnection((err, conn) => {
        var errCode = "return";

        // if 에서 false 처리 되는것들
        // ""
        // 0
        // false
        if(err != null) {
            errCode = "pool error";
            console.log(err.message);
            done(errCode, null);

            return;
        }

        // mysql -> pool -> conn -> query
        // conn.query(ysql, function (err, results) {...})
        conn.query(queryStr, (err, results) => {
            // "SELECT board_id FROM t_board";
            var errCode = "return";

            if(err) {
                errCode = "query error";
                results = null;
                console.log(err.message);
            }

            done(errCode, results);
        });
    });
}

module.exports = {
    selectList: function(queryStr, param, done) {
        execquery(pstmt(queryStr)(param), function (resultCode, result) {
            if(resultCode != "return") {
                done("fail", []);
            } else {
                done("success", result);
            }
        });
    },
    selectOne: function(queryStr, param, done) {
        execquery(pstmt(queryStr)(param), function (resultCode, /*Array*/result) {
            if(resultCode != "return") {
                done("fail", null);
            } else if(result == null || result.length < 1) {
                done("none", null);
            } else {
                done("success", result[0]);
            }
        })
    },
    execute: function(queryStr, param, done) {
        execquery(pstmt(queryStr)(param), function (resultCode, result) {
            if(resultCode != "return") {
                done("fail", 0);
            } else if(result == null || result.affectedRows < 1) {
                done("none", 0);
            } else {
                done("success", result.affectedRows);
            }
        })
    }
};