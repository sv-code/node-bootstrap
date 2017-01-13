const multer = require('multer');

module.exports = {
    db : 'mongodb://test:test123@ds151018.mlab.com:51018/aperture',
    secret: 'coffee',
    port: 8000,
    uploadstorage: multer.diskStorage({
            destination: function(req, file, callback) {
            callback(null, './uploads/');    
        }, 
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }
    })
}