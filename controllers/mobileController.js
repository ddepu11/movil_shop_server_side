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

  const { sellerId, sellerEmail, sellerName, ...body } = req.body;

  try {
    const mobile = new Mobile({
      ...body,
      pictures,
      colors,
      brand: req.body.brand.toLowerCase(),
      sellerInfo: { id: sellerId, name: sellerName, email: sellerEmail },
    });

    await mobile.save();

    res.status(200).json({ msg: 'Some message' });
  } catch (err) {
    res.status(404).json({ msg: 'Could not save the product' });
  }
};

export { getMobiles, createMobile };
