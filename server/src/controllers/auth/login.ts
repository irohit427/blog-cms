import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const login = async (req: any, res: any, next: any) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error);
      }

      req.login(user, { session: false}, async(err: any) => {
        if (err) return next(err);
        const userInfo = {
          _id: user._id,
          username: user.username,
          email: user.email
        }
        const token = jwt.sign({user: userInfo}, 'TOP_SECRET', {expiresIn: '3600s'});
        return res.json({success: true, token: `Bearer ${token}`, userInfo});
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
}

export default login;