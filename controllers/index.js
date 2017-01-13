const logging = require('winston')
    , fs = require('fs')
    , router = require('express').Router();

var files = fs.readdirSync('./controllers'); 
files.forEach(function(file) {
    var route = '/'.concat(file.split('.')[0]);
    if(route !== '/index') {
        logging.info('Adding route => ', route);
        router.use(route, require('.'.concat(route)));
    }
});

module.exports = router;