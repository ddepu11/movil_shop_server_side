const getProducts = (req, res) => {
  res.json({ msg: "All the products" });
};

const createProduct = (req, res) => {
  console.log(req.body);
  res.json({ msg: "Created a product", body: req.body });
};

export { getProducts, createProduct };
