import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserInterface } from '../../interface/User';
import User from '../../models/User';

const register = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  User.findOne({ email }, async (err, user: UserInterface) => {
    if (err) throw err;
    if (user) res.send('User alredy exists')
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: email.split('@')[0],
        email: email,
        password: hashedPassword
      });
      await newUser.save().then(u => {
        res.status(200).json({u})
      }).catch(err => res.status(400).json(err))
    }
  })
}

export default register;