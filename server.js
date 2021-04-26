import express from "express";
import { connectTODB } from "./database/connection.js";
import products from "./routes/products.js";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 5000;

connectTODB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
});

app.use(morgan("dev"));
app.use("/products", products);
