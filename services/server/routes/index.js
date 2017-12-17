const productsController = require('../controllers').products;
const JWT = require('jsonwebtoken');
const JWT_SECRET = "thisIsJustforDemoPurposes";

const passport = require('passport')
const passportConf = require('../config/passport/passport');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.get('/api/product', productsController.list);
  app.use((req, res, next) => {
    var token = getToken(req.headers);
    var decoded = (token) ? JWT.verify(token, JWT_SECRET) : false;
    if (decoded) {
      res.locals.user = decoded;
    }
    next();
  });
  app.put('/api/product', passport.authenticate('jwt', {session: false}), productsController.create);
  app.put("/api/product/:productId/like", passport.authenticate('jwt', {session: false}), 
  productsController.like);
  app.put("/api/product/:productId/purchase", passport.authenticate("jwt", {session: false}), 
  productsController.purchase);
  app.post("/api/admin/product/:proudctId/updatePrice", passport.authenticate("jwt", {session: false}), 
  productsController.update);
  app.use("/api", require("./users"));
};

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};