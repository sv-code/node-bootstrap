const setupController = require('express').Router()
    , config = require('../config/settings')
    , UserModel = require('../models/User');

setupController.get('/', function(req, res) {
    
    let setupLogin = 'sv', setupPassword = 'airpods';
    UserModel.getUser(setupLogin, function(err, user) {
        if(err) throw err;
        console.log(user);
        if(user && user.login === setupLogin) {
            res.json({ 
                success: false, 
                message: 'setupLogin already exists' 
            });
        }
        else {
            UserModel.addUser(setupLogin, setupPassword, function(err, user) {
                if(err) throw err;
                if(!user) {
                    res.json({
                        success: false,
                        message: 'Could not create setupLogin'
                    });
                }
                else {
                    res.json({
                        success: true,
                        message: 'setupUser created'
                    });
                }
             
            });
        }
    })

});

module.exports = setupController;