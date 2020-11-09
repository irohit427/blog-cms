import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../../interface/AuthInterface';
import Blog from '../../models/Blog';

const createBlog = async(req: IGetUserAuthInfoRequest, res: Response) => {
  const { title, content, tags } = req.body;
  const id  = req.user.id;
  const blog = new Blog({
    title,
    content,
    tags,
    author_id: id
  });

  await blog.save().then(d => {
    console.log('Saved:', d)
    return res.status(200).json({
        success: true,
        data: d
    })
  }).catch(err => {
    return res.status(500).json({err})
  })
}

export default createBlog;