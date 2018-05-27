var express = require('express');

// Swagger
var swaggerTools = require('swagger-tools');
var YAML = require('yamljs');
var swaggerDoc = YAML.load('openapi.yaml');

// Check it
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var app = express();

app.use(bodyParser.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());


swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(middleware.swaggerUi());
});

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/css', express.static('./public/css'));
app.use('/icons', express.static('./public/icons/svg'));
app.use('/js', express.static('./public/js'));
app.use('/libs', express.static('./public/libs'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/app_db');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(require('./routes.js'));

app.listen(3000);
