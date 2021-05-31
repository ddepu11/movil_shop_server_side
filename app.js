import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import products from './routes/productRoutes.js';
import user from './routes/userRoutes.js';

import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

const app = express();

// Middleweres
// Morgen is a logger

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, expires: 60 * 60 * 24  },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes for products
app.use('/products', products);

// Routes for user
app.use('/user', user);

export default app;
