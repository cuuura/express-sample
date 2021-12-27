const express = require("express");
var router = express.Router();

/**
 * board views
 */
// get List
router.get("/", (req, res) => {
    var param = {
        menuTitle: "게시판"
    };

    res.render("board/index", param);
});

// get one
router.get("/:board_id", (req, res) => {
    var param = {
        board_id: req.params.board_id
    };

    res.render("board/contents", param);
});

module.exports = router;