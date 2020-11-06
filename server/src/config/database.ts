import mongoose from 'mongoose';
const MONGO_URI = 'mongodb+srv://rohit123:shlocked221b@cluster0.uqlap.mongodb.net/blogDB?retryWrites=true&w=majority'

const connectDatabase = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(c => console.log('Connected to',c.connection.host)).catch(err => console.log(err));
}

export default connectDatabase;