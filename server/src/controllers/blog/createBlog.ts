import { Request, Response } from 'express';
export interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string,
    username: string,
    email: string
  }
}
import Blog from '../../models/Blog';
const createBlog = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { title, content, tags } = req.body;
  const id  = req.user.id;
  const blog = new Blog({
    title,
    content,
    tags,
    author_id: id
  });
  await blog.save().then((d) => {
      return res.status(200).json({
      success: true,
      data: d
    })
  })
}

export default createBlog;