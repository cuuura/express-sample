var db = require("./dbConnector");

function makewhere(param) {
    var whereStr = "";

    if("board_id" in param && param.board_id != null param.board_id != "") {
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
        var sql = "";

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
        var sql = "";

        db.execute(sql, param, (err, results) => {

        });
    },

    delete: function (param, done) {
        var sql = "";

        db.execute(sql, param, (err, results) => {
            if(err != "success") {
                
            }
        });
    }
}