const UsersController = require("../controllers").users;
var express = require('express');
var router = express.Router();

const passport = require('passport')
const passportConf = require('../config/passport/passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
router.post('/signin', validateBody(schemas.authSchema), passport.authenticate('local', 
{session: false}), UsersController.signin);

router.get('/secret', passport.authenticate('jwt', {session: false}), UsersController.secret);

module.exports = router;