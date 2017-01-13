const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    login : String,
    password : String
});

var User = module.exports = mongoose.model('user', userSchema);

module.exports.getUser = function(login, callback) {
    UserModel.findOne({
        login : login
    }, callback);
}

module.exports.addUser = function(login, password, callback) {
    user = new User({
        login: login,
        password: password
    });
    
    User.create(user, callback);
}