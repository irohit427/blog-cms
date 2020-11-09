import { Request, Response } from 'express';
import User from '../../models/User';
const users = (req: Request, res: Response) => {
  User.find({type: 'moderator'})
    .then((users: any) => res.status(200).json({users}))
    .catch(err => res.status(500).json({err}));
}

export default users;