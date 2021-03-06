import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDatabase from './config/database';
import passportConfig from './config/passport';
import authRouter from './routes/auth';
import blogRouter from './routes/blog';
import userRouter from './routes/user';
import publicRouter from './routes/public';

const app = express();
app.use(express.json());

app.use(session({
  secret: 'hjgcccvyeiftew48445154723rsdf44r7gfwfdedfytfdt',
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(morgan('dev'));
passportConfig(passport);

app.use('/', publicRouter);
app.use('/api/admin/auth/', authRouter);
app.use('/api/v1/admin/blog/',passport.authenticate('jwt', {session: false}), blogRouter);
app.use('/api/admin/user/', passport.authenticate('jwt', {session: false}), userRouter);
connectDatabase();
app.listen(4000, () => {
  console.log("Listening on port 4000");
})