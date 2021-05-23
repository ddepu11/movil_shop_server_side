import express from "express";
import { connectTODB } from "./database/connection.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import products from "./routes/products.js";
import user from "./routes/user.js";

const app = express();

const PORT = process.env.PORT || 5000;

connectTODB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Morgen is a logger
app.use(morgan("dev"));

// Routes for products
app.use("/products", products);

// Routes for user
app.use("/user", user);
