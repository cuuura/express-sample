var db = require('./dbConnector');

module.exports = {
    getUserList: function(params, handler) {
        var sql = 'SELECT * FROM user';

        db.selectList(sql, handler);
    }
}