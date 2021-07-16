import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleweres
// Morgen is a logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '/client/public')));
  app.get('*', (req, res) =>
    res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.use(express.static(join(__dirname, '/public')));
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
