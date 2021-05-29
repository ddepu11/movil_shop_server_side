import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import products from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";

const app = express();

// Middleweres
// Morgen is a logger
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes for products
app.use("/products", products);

// Routes for user
app.use("/user", user);

export default app;
