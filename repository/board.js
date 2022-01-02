const { query } = require("express");
var db = require("./dbConnector");

function makewhere(param) {
    var whereStr = "";

    if("board_id" in param && param.board_id != null && param.board_id != "") {
        whereStr += "AND board_id = :board_id ";
    }
    if("title" in param && param.title != null && param.title != "") {
        whereStr += "AND title LIKE CONCAT('%', :title, '%') ";
    }
    if("user_id" in param && param.user_id != null && param.user_id != "") {
        whereStr += "AND user_id = :user_id ";
    }
    if("contents" in param && param.contents != null && param.contents != "") {
        whereStr += "AND contents LIKE CONCAT('%', :contents, '%') ";
    }
    if("use_fg" in param && param.use_fg != null && param.use_fg != "") {
        whereStr += "AND use_fg = :use_fg ";
    }
    if("edited_at" in param && param.edited_at != null && param.edited_at != "") {
        whereStr += "AND edited_at = :edited_at ";
    }
    if(whereStr.length > 0) {
        whereStr = "WHERE" + whereStr.substring(3);
    }

    var limitStr = "";

    if("current_page" in param && parseInt(param.current_page) != "NaN" && typeof parseInt(param.current_page) == "number" && "page_size" in param && typeof parseInt(param.page_size) == "number") {
        limitStr = "LIMIT " + (parseInt(param.current_page) * parseInt(param.page_size)) + ", " + parseInt(param.page_size) + " ";
    }

    return limitStr + whereStr;
}

function getPageInfo(param, done) {
    var queryStr = "SELECT CEIL((COUNT(*)/:page_size)) AS total_page\
                         , :current_page AS current_page\
                         , (:current_page DIV :page_size) * :page_size AS page_start\
                         , (:current_page DIV :page_size) * :page_size + (:page_size - 1) AS page_end\
                      FROM tb_board";

    console.log(queryStr);

    db.selectList(queryStr, param, (resultCode, results) => {
        done(resultCode, results);
    });
}

module.exports = {
    getList: function (param, done) {
        // SELECT board_id 등 FROM tb_board WHERE board_id = :board_id
        var queryStr = "SELECT b.board_id \
                             , b.title\
                             , b.user_id\
                             , u.name\
                             , b.use_fg\
                             , b.edited_at\
                          FROM tb_board b\
                          LEFT\
                          JOIN tb_user u\
                            ON b.user_id = u.user_id ";
            queryStr+= " ORDER BY b.board_id DESC ";
            queryStr+= makewhere(param);

        console.log(queryStr);

        // Number
        // default : 0
        var currentPage = "current_page" in param && param.current_page != null && param.current_page != "" && parseInt(param.current_page) != "NaN" && typeof parseInt(param.current_page) == "number"? param.current_page: "0";
        // Number
        // default : 5
        var pageSize = "page_size" in param && param.page_size != null && param.page_size != "" && parseInt(param.page_num) != "NaN" && typeof parseInt(param.page_num) == "number"? param.page_size: "5";
        param["page_size"] = pageSize;
        param["current_page"] = currentPage;

        db.selectList(queryStr, param, (resultCode, results) => {
            var returnObj = {
                list: [], 
                current_page: 0, 
                total_page: 1, 
                page_start: 0, 
                page_end: 4
            }

            //resultCodeorCode = 0
            // resultCodeorCode != 0 에러발생
            if(resultCode == "success") {
                // done(resultCode, results);
                // Board[]
                returnObj["list"] = results;
            } 

            getPageInfo({current_page:currentPage, page_size: pageSize}, (resultCode, results) => {
                if(resultCode == "success") {
                    returnObj["current_page"] = results[0].current_page;
                    returnObj["total_page"] = results[0].total_page;
                    returnObj["page_start"] = results[0].page_start;
                    returnObj["page_end"] = results[0].total_page - 1 >= results[0].page_end? results[0].page_end: results[0].total_page - 1;
                }

                done(resultCode, returnObj);
            });
        });
    },
    
    getOne: function (param, done) {
        var queryStr = "SELECT b.board_id \
                             , b.title\
                             , b.user_id\
                             , u.name\
                             , b.contents\
                             , b.use_fg\
                             , b.edited_at\
                          FROM tb_board b\
                          LEFT\
                          JOIN tb_user u\
                            ON b.user_id = u.user_id ";
            queryStr+= makewhere(param);

        console.log(queryStr);

        db.selectOne(queryStr, param, (resultCode, results) => {
            if(resultCode != "success") {
                done(resultCode, results);
            } else {
                done(resultCode, results);
            }
        });
    },

    insert: function (param, done) {
        var queryStr = "INSERT INTO tb_board \
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

        console.log(queryStr);

        db.execute(queryStr, param, (resultCode, results) => {
            if(resultCode == "success" && results > 0) {
                var selectLastOne = "SELECT title\
                                          , user_id\
                                          , use_fg\
                                          , edited_at\
                                       FROM tb_board";
                    selectLastOne+= makewhere(param);

                // this.getOne(param, (resultCode, results) => {
                //     if(resultCode == "success") {
                //         done(resultCode, results);
                //     } else {
                //         done(resultCode, null);
                //     }
                // });
                done(resultCode, results);
            } else {
                done(resultCode, results);
            }
        });
    },

    update: function(param, done) {
        var queryStr = "UPDATE tb_board\
                           SET title     = :title\
                             , contents  = :contents\
                             , use_fg    = :use_fg\
                             , edited_at = NOW()\
                         WHERE board_id = :board_id";

        console.log(queryStr);

        db.execute(queryStr, param, (resultCode, results) => {
            if(resultCode == "success" && results > 0) {
                this.selectOne(param, (resultCode, results) => {
                    if(resultCode != "success") {
                        done(resultCode, null);
                    } else {
                        done(resultCode, results);
                    }
                });
            } else {
                // resultCode
                // success : 성공
                // none : 영향받은 row 없음
                // fail : 에러
                done(resultCode, null);
            }
        });
    },

    delete: function (param, done) {
        var queryStr = "DELETE\
                          FROM tb_board";
            queryStr+= makewhere(param);

        console.log(queryStr);

        db.execute(queryStr, param, (resultCode, results) => {
            if(resultCode != "success" && results == 0) {
                done(resultCode, 0);
            } else {
                done(resultCode, results);
            }
        });
    }
}