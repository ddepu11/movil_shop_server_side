import Mobile from '../modals/Mobile.js';

// @desc   Get all the mobile data as JSON
// @route  GET  products/
const getMobiles = (req, res) => {
  res.json({ msg: 'All the products' });
};

// @desc   Save a mobile data
// @route  POST  products/
const createMobile = async (req, res) => {
  const fileNames = req.files.map((e) => e.filename);

  try {
    const mobile = new Mobile({ ...req.body, pictures: [...fileNames] });

    await mobile.save();

    res.status(200).json({ msg: 'Some message' });
  } catch (error) {
    res.status(404).json({ msg: 'Could not save the product' });
  }
};

export { getMobiles, createMobile };
