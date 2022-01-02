const express = require("express");
const res = require("express/lib/response");
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
router.get("/:boardId", (req, res) => {
    var param = {
        menuTitle: "게시글 보기",
        boardId: req.params.boardId
    };

    res.render("board/contents", param);
});

router.get("/write", (req, res) => {
    var param = {
        menuTitle: "글쓰기"
    }
    res.render("board/contents", param);
})

module.exports = router;