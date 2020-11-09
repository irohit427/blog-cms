import { Request, Response } from 'express'
import User from '../../models/User';

const deleteUser = (req: Request, res: Response) => {
  let id = req.params.id;
  User.findByIdAndRemove(id).then((user: any) => {
    res.status(200).json({user})
  }).catch((err) => res.status(500).json({err}))
}

export default deleteUser;