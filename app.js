import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import mobile from './routes/mobileRoutes.js';
import user from './routes/userRoutes.js';
import seller from './routes/sellerRoutes.js';
import order from './routes/ordersRoute.js';

dotenv.config({ path: './config.env' });

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'MovilShop Express API',

      version: '1.0.0',

      description:
        'This is a simple CRUD API Application made with Express and documented with Swagger',

      contact: {
        name: 'Deepanshu Tiwari',
        url: 'https://ddepu11.github.io/PortFolio__Website/',
        email: 'ddepu11@gmail.com',
      },
    },

    servers: [{ url: 'http://localhost:5000' }],
  },

  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Middleweres
// Morgen is a logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes for user
app.use('/users', user);

// Routes for mobiles
app.use('/mobiles', mobile);

app.use('/sellers', seller);

app.use('/orders', order);

export default app;
