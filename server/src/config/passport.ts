import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { Strategy, ExtractJwt } from 'passport-jwt';
import e from 'express';


const LocalStrategy = passportLocal.Strategy;

const passportConfig = (passport: any) => {
  passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username}, (err, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log('User not found');
        return done(null, false, {message: 'Incorrect username'});
      }
      console.log(user);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect password'});
        }
      })
  
    })
  }))
  
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  })
  
  passport.deserializeUser((id: string, done: any) => {
    User.findOne({_id: id}, (err, user: any) => {

      const userInfo = {
        username: user.username,
        email: user.email
      }
      done(err, userInfo);
    });
  });

  passport.use(
    new Strategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      (payload, done) => {
        User.findOne({_id: payload.user._id}).then((user: any) => {
            if (user) {
               done(null, {id: user.id, username: user.username, email: user.email, role: user.role});
            } else {
              done(null, false);
            }
          }).catch (error => {
           done(error);
        })
      }
    )
  );
}


export default passportConfig;