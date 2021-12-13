var db = require("./dbConnector");

function makewhere(param) {
    var whereStr = "";

    if("id" in param && param.id != null && param.id != "") {
        whereStr += "AND id = :id ";
    }
    if("name" in param && param.name != null && param.name != "") {
        whereStr += "AND name = :name ";
    }
    if("height" in param && param.height != null && param.height != "") {
        whereStr += "AND height = :height ";
    }
    if(whereStr.length > 0) whereStr = "WHERE " + whereStr.substr(3);

    return whereStr;
}

module.exports = {
    selectList: function(param, done) {
        var sql = "SELECT * \
                     FROM user"
            sql+= makewhere(param);
            sql+= " ORDER BY id desc";

        console.log(sql);

        db.selectList(sql, param, (errCode, results) => {
            done(errCode, results);
        });
    },
    selectOne : function(key, done) {
        var param = {
            key: key
        }
        var sql = "SELECT * \
                     FROM user \
                    WHERE id = :key ";
            sql+= " ORDER BY id DESC";

        console.log(sql);
        
        db.selectOne(sql, param, (errCode, results) => {
            done(errCode, results);
        });
    },
    insert: function(param, done) {
        var sql = "INSERT INTO user \
                   ( \
                        name, \
                        height, \
                        profile \
                   ) \
                   VALUES \
                   ( \
                        :user_name, \
                        :height, \
                        :profile \
                   )";

        console.log(sql);

        db.execute(sql, param, (errCode) => {
            if(errCode == "success") {
                db.selectOne("SELECT * as id FROM user WHERE id = (SELECT max(id) FROM user)", {}, function(errCode, results) {
                    done(errCode, results);
                })
            } else {
                done(errCode, null);
            }
        });
    },
    update: function(param, done) {
        var sql;

        console.log(sql);

        db.execute(sql, param, (errCode) => {
            if(errCode == "success") {
                db.selectOne("SELECT * FROM user WHERE id = :id", param, (errCode, results) => {
                    if(errCode != "success") {
                        done(errCode, null);
                    }

                    done(errCode, results);
                });
            }
        });
    },
    delete: function(param, done) {
        var sql;

        console.log(sql);

        db.execute(sql, param, (errCode) => {
            if(errCode == "success") {
                db.selectOne("SELECT * FROM user WHERE id = :id", param, (errCode, results) => {
                    if(errCode != "success") {
                        done(errCode, null);
                    }

                    done(errCode, results);
                });
            }
        })
    }
}