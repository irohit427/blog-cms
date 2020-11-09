import { Response } from 'express';
import Blog from '../../models/Blog';
import { IGetUserAuthInfoRequest } from '../../interface/AuthInterface';

const getBlogs = (req: IGetUserAuthInfoRequest, res: Response) => {
  const id  = req.user.id;
  Blog.find({author_id: id}).then(blogs => {
    res.status(200).json({blogs});
  }).catch(err => res.status(500).json({err}));
}

export default getBlogs;