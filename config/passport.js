const { ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;
const opts = {}
const { User } = require("../models")
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
module.exports = passport => {
  passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({
      where: {
        id: jwt_payload.id
      }
    }).then(user => {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    }).catch(err =>{
      console.log(err)
    })
  }))
}