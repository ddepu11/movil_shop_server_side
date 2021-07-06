import Mobile from '../modals/Mobile.js';

// @desc   Get all the mobile data as JSON
// @route  GET  mobiles/
const getMobiles = async (req, res) => {
  try {
    const mobiles = await Mobile.find({});

    if (mobiles) {
      res.status(200).json({ mobiles });
    } else {
      res.status(200).json({ msg: 'Sorry could not fetch the data!!!' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// @desc   Save a mobile data
// @route  POST  mobiles/
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

const getMobile = async (req, res) => {
  const { mobileId } = req.params;

  try {
    const mobile = await Mobile.findOne({ _id: mobileId });

    if (mobile) {
      res.status(200).json({ mobile });
    } else {
      res.status(404).json({ msg: 'Could not fetch mobile!' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const reviewMobile = async (req, res) => {
  try {
    const { stars, id } = req.body;

    const mobile = await Mobile.findOneAndUpdate(
      { _id: id },
      { $push: { reviews: { id: req.userId, stars } } },
      { new: true }
    );

    if (mobile) {
      res.status(200).json({ mobile });
    } else {
      res.status(404).json({ msg: 'Could not made review!' });
    }
  } catch (err) {
    res.status(400).json({ msg: '' });
  }
};

export { getMobiles, createMobile, getMobile, reviewMobile };
