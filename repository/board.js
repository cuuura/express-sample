var db = require("./dbConnector");

function makewhere(param) {
    var whereStr = "";

    if("board_id" in param && param.board_id != null && param.board_id != "") {
        whereStr += "AND board_id = :board_id";
    }
    if("title" in param && param.title != null && param.title != "") {
        whereStr += "AND title LIKE CONCAT('%', :title, '%') ";
    }
    if("user_id" in param && param.user_id != null && param.user_id != "") {
        whereStr += "AND user_id LIKE CONCAT('%', :user_id, '%') ";
    }
    if("contents" in param && param.contents != null && param.contents != "") {
        whereStr += "AND contents LIKE CONCAT('%', :contents, '%') ";
    }
    if("use_fg" in param && param.use_fg != null && param.use_fg != "") {
        whereStr += "AND use_fg = :use_fg ";
    }
    if("edited_a" in param && param.edited_a != null && param.edited_a != "") {
        whereStr += "AND edited_a = :edited_a ";
    }
    if(whereStr.length > 0) whereStr = "WHERE " + whereStr.substring(3);

    return whereStr;
}

module.exports = {
    getList: function (param, done) {
        var sql = "SELECT board_id \
                        , title\
                        , user_id\
                        , contents\
                        , use_fg\
                        , edited_at\
                     FROM tb_board"
            sql+= makewhere(param);

        db.selectList(sql, param, (err, results) => {
           if(err != "success")  {
               done(err);
           } else {
               done(err, results);
           }
        });
    },
    
    getOne: function (param, done) {
        var sql = "";

        db.selectOne(sql, param, (err, results) => {
            if(err != "success") {
                done(err);
            } else {
                done(err, results);
            }
        });
    },

    insert: function (param, done) {
        var sql = "INSERT INTO tb_board \
                   (\
                       title, \
                       user_id, \
                       contents, \
                       use_fg, \
                       edited_at\
                   )\
                   VALUES\
                   (\
                       :title, \
                       :user_id, \
                       :contents, \
                       :use_fg, \
                       NOW()\
                   )";

        db.execute(sql, param, (err, results) => {
            if(err != "success") {
                done(err);
            } else {
                db.selectOne("", param, (err, results) => {
                    done(err, results);
                });
            }
        });
    },

    update: function(param, done) {
        var sql = "UPDATE tb_board\
                      SET title     = :title\
                        , contents  = :contents\
                        , use_fg    = :use_fg\
                        , edited_at = NOW()\
                    WHERE board_id = :board_id";

        console.log(sql);

        db.execute(sql, param, (err, results) => {
            if(err == "success") {
                this.selectOne(param, (err, results) => {
                    if(err != "success") {
                        done(err, null);
                    } else {
                        done(err, results);
                    }
                });
            } else {
                done(err, null);
            }
        });
    },

    delete: function (param, done) {
        var sql = "DELETE\
                     FROM tb_board\
                    WHERE board_id = :board_id";

        db.execute(sql, param, (err) => {
            done(err, null);
        });
    }
}