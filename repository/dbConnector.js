const mysql = require("mysql");
const pstmt = require("yesql").mysql;

// const con = mysql.getConnection({
//     host: "172.17.0.2",
//     user: "test_user",
//     password: "test_user123",
// })

const pool = mysql.createPool({
    host: "localhost",
    database: "example_db",
    user: "test_user",
    password: "test_user123",
    connectionLimit : 10
})

function execquery(ysql, done) {
    pool.getConnection((err, conn) => {
        var errCode = "return";

        if(err) {
            errCode = "pool error";
            console.log(err.message);
            done(errCode, null);
        }

        conn.query(ysql, (err, results) => {
            var errCode = "return";

            if(err) {
                errCode = "query error";
                results = null;
                console.log(err.message)
            }

            done(errCode, results);
        });
    });
}

module.exports = {
    selectList: function(ysql, param, done) {
        execquery( pstmt(ysql)(param), function (code, result) {
            if(code != "return") {
                done("fail", []);
            } else {
                done("success", result);
            }
        });
    },
    selectOne: function(ysql, param, done) {
        execquery(pstmt(ysql)(param), function (code, result) {
            if(code != "return") {
                done("fail", null);
            } else if(result == null || result.length < 1) {
                done("none", null);
            } else {
                done("success", result[0]);
            }
        })
    },
    execute: function(ysql, param, done) {
        execquery(pstmt(ysql)(param), function (code, result) {
            if(code != "return") {
                done("fail", 0);
            } else if(result == null || result.affectedRows < 1) {
                done("none", 0);
            } else {
                done("success", result.affectedRows);
            }
        })
    }
};