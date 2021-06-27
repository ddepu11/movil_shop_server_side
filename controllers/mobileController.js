import Mobile from '../modals/Mobile.js';

// @desc   Get all the mobile data as JSON
// @route  GET  products/
const getMobiles = (req, res) => {
  res.json({ msg: 'All the products' });
};

// @desc   Save a mobile data
// @route  POST  products/
const createMobile = async (req, res) => {
  const pictures = req.files.map((e) => e.filename);
  const colors = req.body.colors.split(',');

  try {
    const mobile = new Mobile({
      ...req.body,
      pictures,
      colors,
    });

    await mobile.save();

    res.status(200).json({ msg: 'Some message' });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: 'Could not save the product' });
  }
};

export { getMobiles, createMobile };
