import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String},
  content: {
    type: String
  },
  author_id: { type: String },
  tags: { type: String }
}, { timestamps: true})

export default mongoose.model('Blog', BlogSchema, 'blogs');