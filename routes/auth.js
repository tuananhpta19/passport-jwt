const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
var UserModel = require("../models/UserModel")
router.get('/isAuth', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({username: req.user.email});
});

/* POST login. */
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  function (email, password, cb) {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    return UserModel.findOne({email, password}).lean()
       .then(user => {
           if (!user) {
               return cb(null, false, {message: 'Incorrect email or password.'});
           }
           return cb(null, user, {message: 'Logged In Successfully'});
      })
      .catch(err => cb(err));
  }
  ));
  
module.exports =router