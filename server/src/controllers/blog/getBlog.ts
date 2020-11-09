import { Request, Response } from 'express';
import Blog from '../../models/Blog';


const getBlog = (req: Request, res: Response) => {
  const id = req.params.id;
  Blog.findById(id).then(blog => {
    res.status(200).json({blog});
  }).catch(err => res.status(500).json({err}));
}

export default getBlog;