const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");

// Set up the express app
const app = express();


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

require('./server/routes')(app);

module.exports = app;