import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import products from './routes/productRoutes.js';
import user from './routes/userRoutes.js';

dotenv.config({ path: './config.env' });

const app = express();

// Middleweres
// Morgen is a logger

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes for products
app.use('/products', products);

// Routes for user
app.use('/user', user);

export default app;
