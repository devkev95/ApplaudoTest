const passport = require('passport');
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JWT_SECRET = "thisIsJustforDemoPurposes";
const User = require('../../models').User;

passport.use(new JwtStrategy({
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 secretOrKey: JWT_SECRET
    }, async (payload, done) => {
        try {
            const user = User.findById(payload.sub);

            if (!user) {
                return done(null, false);
            }

            done(null, user);
        } catch(err) {
            done(err, false);
        }
}))

passport.use(new LocalStrategy({
 usernameField: 'email'
}, async (email, password, done) => {

 try {
    const user = await User.findOne({ where: {email: email} })
    
    if (!user) {
        return done(null, false); 
    }
    
    bcrypt.compare(password, user.password, function(err, res)
    {
        if (res){
            return done(null, user);
        }
        else
        {
            return done(null, false);
        }

        if(err){
            throw new Error(error);
            return done(null, false);
        }
    });
    
    } catch (error) {
    return done(error, false)
 }
  
}))