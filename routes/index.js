var express = require("express");
var router = express.Router();

// router.use((req, res, next) => {
//     req.query
// })

// router.use("/birds", require("./birds"));
router.use("/users", require("./users"));
router.use("/board", require("./board"));

router.use("/views/board", require("./views/board"));

module.exports = router;