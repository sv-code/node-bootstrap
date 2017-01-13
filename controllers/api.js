const logger = require('winston')
    , apiController = require('express').Router()
    , jsonWebToken = require('jsonwebtoken')
    , config = require('../config/settings')
    , UserModel = require('../models/User')
    , upload = require('multer');

apiController.use(function(req, res, next) {
   
    if(req.url === '/' || req.url === '/auth' || req.url === '/upload') {
        return next();
    }
        
    let token = req.query.token || req.body.token;
    if(token) {
        jsonWebToken.verify(token, config.secret, function(err, decoded) {
            if(err) {
                return res.json({ 
                    success: false, message: 'Failed to authenticate token' 
                });
            }
            else {
                req.decoded = decoded;
                return next();
            }
        })   
    }  
    else {
        res.status(403).send({
            success: false,
            message: 'No token sent'
        });
    }
    
});

apiController.get('/', function(req, res) {
   res.json('Welcome to bootstrap API. Authenticate yourself!') 
});

apiController.post('/auth', function(req, res) {
    let login = req.body.login;
    let password = req.body.password;
    console.log(login);
    
    UserModel.getUser(login, function(err, user) {
        if(err) throw err;
        if(!user) {
            res.json({ 
                success: false, 
                message: 'Authentication failed. User not found' 
            });
        }
        else if(user) {
            if(user.password != password) {
                res.json({ 
                    success: false, 
                    message: 'Authentication failed. Wrong password' 
                });
            }
            else {
                let token = jsonWebToken.sign(login, config.secret, {
                    //expiresIn: "1h" 
                });
                
                res.json({
                    success: true, 
                    message: 'Authenticated',
                    token: token 
                });
            }
        }
    });
});


apiController.post('/upload', upload({ storage: config.uploadstorage }).single('file'), function(req, res) {
    logger.info(req.file);
    res.json({
        success : true,
        message: 'File uploaded'
    });
});

module.exports = apiController;