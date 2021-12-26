const express = require("express");
const router = express.Router();

/**
 * board views
 */
// get List
router.get("/", (req, res) => {
    var param = 
    res.render("board/index", param);
});

// get one
router.get("/:board_id", (req, res) => {
    var param = {
        board_id: req.params.board_id
    }

    res.render("board/contents", param);
});