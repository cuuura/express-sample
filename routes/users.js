var express = require("express");
var router = express.Router();

var userRepo = require("../repository/user")

// get List
router.get("/", (req, res) => {
    var params = {
        id: req.query.key, 
        name: req.query.name, 
        height: req.query.height
    };

    userRepo.selectList(params, (errCode, results) => {
        if(errCode != "success") {
            res.send(errCode);
        }

        res.render("users/index", {users:results})
        // res.send(results);
    });
})

// get one
router.get("/:key", (req, res) => {
    var key = req.params.key;
    
    userRepo.selectOne(key, (errCode, results) => {
        if(errCode != "success") {
            res.send(errCode);
        }

        res.send(results);
    });
});

// insert
router.post("/", (req, res) => {
    var param = {
        user_name: req.body.user_name,
        height: req.body.height,
        profile: req.body.profile
    }

    console.log(param.toString());

    userRepo.insert(param, (errCode, results) => {
        if(errCode != "success") {
            res.send(errCode);
        }

        res.send(results);
    });
});

// update
router.put("/:id", (req, res) => {
    var id = req.params.id;

    userRepo.update(id, (errCode, results) => {
        if(errCode != "success") {
            res.send(errCode);
        }

        res.send(results);
    });
})

// delete
router.delete("/:id", (req, res) => {
    var id = req.params.id;

    userRepo.delete(id, (errCode, results) => {
        if(errCode != "success") {
            res.send(errCode);
        }

        res.send(errCode);
    });
});

module.exports = router;