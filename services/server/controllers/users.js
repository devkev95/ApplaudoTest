
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = "thisIsJustforDemoPurposes";
 

signToken = ((user) => {
    return JWT.sign({
        iss: 'ApiAuth',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
        role : function (){
            if (user.role == 2) {
                return "REG"
            } else if (user.role == 1) {
                return "ADM"
            } },
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName
  }, JWT_SECRET)
})
 
 
module.exports = {
 
  signin: async (req, res, next) => {
    const token = signToken(req.user)
    res.status(200).json({ token })
  },
 
  secret: async (req, res, next) => {
    res.json({ secret: "resource"});
  }
}