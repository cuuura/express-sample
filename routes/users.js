var express = require('express');
var router = express.Router();

var userRepo = require('../repository/user')

router.get('/', (req, res) => {
    var params;

    userRepo.getUserList(params, (errCode, results) => {
        if(errCode != 'OK') {
            res.send('error');
        }

        res.send(results);
    });
})

module.exports = router;