import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mobile from './routes/mobileRoutes.js';
import user from './routes/userRoutes.js';

dotenv.config({ path: './config.env' });

const app = express();

const url = import.meta.url;
const __filename = fileURLToPath(url);
const __dirname = dirname(__filename);

// Middleweres
// Morgen is a logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes for products
app.use('/mobile', mobile);

// Routes for user
app.use('/user', user);

export default app;
