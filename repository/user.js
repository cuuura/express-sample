const res = require("express/lib/response");
var db = require("./dbConnector");

function makewhere(param) {
    var whereStr = "";

    if("id" in param && param.id != null && param.id != "") {
        whereStr += "AND id = :id ";
    }
    if("user_name" in param && param.name != null && param.name != "") {
        whereStr += "AND name = :user_name ";
    }
    if(whereStr.length > 0) whereStr = "WHERE " + whereStr.substr(3);

    return whereStr;
}

module.exports = {
    selectList: function(param, done) {
        var sql = "SELECT * \
                     FROM user";
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
                        profile, \
                        date \
                   ) \
                   VALUES \
                   ( \
                        :user_name, \
                        :height, \
                        :profile, \
                        NOW() \
                   )";

        console.log(sql);

        db.execute(sql, param, (errCode) => {
            if(errCode == "success") {
                db.selectOne("SELECT * FROM user", param, function(errCode, results) {
                    done(errCode, results);
                })
            } else {
                done(errCode, null);
            }
        });
    },
    update: function(param, done) {
        var sql = "UPDATE user SET ";
        if("user_name" in param && param.user_name != null && param.user_name != "")
        {
            sql+= "name = :user_name, ";
        }
        if("height" in param && param.height != null && param.height != "")
        {
            sql+= "height = :height, ";
        }
        if("profile" in param && param.profile != null && param.profile != "")
        {
            sql+= "profile = :profile, ";
        }
            sql+= "date = NOW()"
            sql+= " ";
            sql+= "WHERE id = :id";

        console.log(sql);

        db.execute(sql, param, (errCode) => {
            if(errCode == "success") {
                db.selectOne("SELECT * FROM user WHERE id = :id", param, (errCode, results) => {
                    if(errCode != "success") {
                        done(errCode, null);
                    }

                    done(errCode, results);
                });
            } else {
                done(errCode, null);
            }
        });
    },
    delete: function(param, done) {
        var sql = "DELETE \
                     FROM user \
                    WHERE id = :id";

        console.log(sql);

        db.execute(sql, param, (errCode) => {
            if(errCode == "success") {
                db.selectOne("SELECT * FROM user WHERE id = :id", param, (errCode, results) => {
                    if(errCode != "success") {
                        done(errCode, null);
                    } else {
                        done(errCode, results);
                    }
                });
            } else {
                done(errCode, null);
            }
        })
    }
}