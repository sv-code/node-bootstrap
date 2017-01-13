// libs
const logger = require('winston')
    , express = require('express')
    , session = require('express-session')
    //, cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    //, passport = require('passport')
    , mongoose = require('mongoose');

// includes
const config = require('./config/settings')
    , controllers = require('./controllers');

// db
mongoose.connect(config.db);
mongoose.connection.on('open', function() {
   logger.info('Connected to DB'); 
});

// app middleware
const app = express();
app.use(session({ secret: config.secret }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views');
app.set('view engine', 'ejs');

// controllers / routes
app.use(controllers);

// start
const port = config.port || 8000;
app.listen(port);
logger.info('Server listening @', port);


    
    