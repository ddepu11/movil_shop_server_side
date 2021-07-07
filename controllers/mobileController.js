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

const updateMobileReview = async (req, res) => {
  try {
    const { stars, mobileId, reviewId } = req.body;

    const mobile = await Mobile.findOneAndUpdate(
      { _id: mobileId },
      { $set: { 'reviews.$[elem].stars': stars } },
      { new: true, arrayFilters: [{ 'elem._id': { $eq: reviewId } }] }
    );

    const mobileStars = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    mobile.reviews.forEach((r) => {
      mobileStars[r.stars] += 1;
    });

    const calculateAvgStars = () => {
      const keys = Object.keys(mobileStars);
      const values = Object.values(mobileStars);

      let u = 0;

      keys.forEach((e, index) => {
        u += e * values[index];
      });

      const b = values.reduce((p, c) => p + c);

      return u / b;
    };

    mobile.avgStar = calculateAvgStars();

    await mobile.save();

    if (mobile) {
      res.status(200).json({ mobile });
    } else {
      res.status(404).json({ msg: 'Could not made review!' });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export {
  getMobiles,
  createMobile,
  getMobile,
  reviewMobile,
  updateMobileReview,
};
