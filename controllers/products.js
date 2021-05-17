import Mobile from "../modals/Mobile.js";

const getProducts = (req, res) => {
  res.json({ msg: "All the products" });
};

const createProduct = async (req, res) => {
  console.log(req.body);

  try {
    const mobile = new Mobile(req.body);
    mobile.save();
  } catch (error) {
    console.log(error);
  }

  res.json({ msg: "Created a product", body: req.body });
};

export { getProducts, createProduct };
