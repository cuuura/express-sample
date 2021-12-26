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
        contents: req.query.contents
    };

    boardRepo.getList(param, (err, results) => {
        if(err != "success") {
            res.send(err);
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

    boardRepo.getOne(param, (err, results) => {
        if(err != "success") {
            res.send(err);
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

    boardRepo.insert(param, (err, results) => {
        if(err == "success") {
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

    boardRepo.update(param, (err, results) => {
        if(err == "success") {
            res.send("success");
        } else {
            res.send("error");
        }
    })
});

// delete
router.delete(":board_id", (req, res) => {
    boardRepo.delete(param, (err, results) => {
        if(err == "success") {
            res.send("success");
        } else {
            res.send("error");
        }
    })
});

module.exports = router;