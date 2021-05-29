import Mobile from "../modals/Mobile.js";

// @desc   Get all the mobile data as JSON
// @route  GET  products/
const getMobiles = (req, res) => {
  res.json({ msg: "All the products" });
};

// @desc   Save a mobile data
// @route  POST  products/
const createMobile = async (req, res) => {
  try {
    const mobile = new Mobile(req.body);
    await mobile.save();
    res.json({ msg: "Created a product", body: req.body });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "could not save the product." });
  }
};

export { getMobiles, createMobile };
