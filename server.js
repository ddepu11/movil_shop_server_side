import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});


app.get("/", (req, res) => {
  res.send("Hello World!!!");
});
