var express = require("express");
var router = express.Router();

var boardRepo = require("../repository/board");
/**
 * rest-API
 */
// getList
router.get("/", (req, res) => {
    var param = {
        board_id: req.query.board_id, 
        title: req.query.title,
        contents: req.query.contents,
        current_page: req.query.current_page,
        page_size: req.query.page_size
    };

    boardRepo.getList(param, (resultCode, results) => {
        if(resultCode != "success") {
            res.send(resultCode);
        } else {
            res.send(results);
        }
    });
});

// getOne
router.get("/:board_id", (req, res) => {
    var param = {
        board_id: req.params.board_id
    };

    boardRepo.getOne(param, (resultCode, results) => {
        if(resultCode != "success") {
            res.send(resultCode);
        } else {
            res.send(results);
        }
    });
});

// insert
router.put("/", (req, res) => {
    var param = {
        title: req.body.title, 
        user_id: req.body.user_id, 
        contents: req.body.contents, 
        use_fg: req.body.use_fg, 
    };

    boardRepo.insert(param, (resultCode, results) => {
        if(resultCode == "success") {
            res.send("success");
        } else {
            res.send("error");
        }
    });
});

// update
router.post("/:board_id", (req, res) => {
    var param = {
        board_id: req.params.board_id,
        title: req.body.title,
        user_id: req.body.user_id,
        contents: req.body.contents,
        use_fg: req.body.use_fg
    }

    boardRepo.update(param, (resultCode, results) => {
        if(resultCode == "success") {
            res.send("success");
        } else {
            res.send("error");
        }
    })
});

// delete
router.delete(":board_id", (req, res) => {
    boardRepo.delete(param, (resultCode, results) => {
        if(resultCode == "success") {
            res.send("success");
        } else {
            res.send("error");
        }
    })
});

module.exports = router;