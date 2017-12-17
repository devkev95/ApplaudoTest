
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = "thisIsJustforDemoPurposes";
 

signToken = ((user) => {
    return JWT.sign({
        iss: 'ApiAuth',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
        email: user.email,
        name: user.firstName + " " + user.lastName,
        role : (user.role == 1) ? "ADMIN" : (user.role == 2) ? "NORMAL" : null
  }, JWT_SECRET)
})
 
 
module.exports = {
 
  signin: async (req, res, next) => {
    const token = signToken(req.user)
    res.status(200).json({ token })
  },
 
  secret: async (req, res, next) => {
    
    res.json({ secret: "resource", email : res.locals.user});
  }
}

