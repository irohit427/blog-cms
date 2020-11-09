import { Request, Response } from 'express'
const profile = (req: Request, res: Response) => {
  let token = req.headers.authorization
  return res.status(200).json({
    message: 'User Profile',
    user: req.user,
    token
  });
}

export default profile