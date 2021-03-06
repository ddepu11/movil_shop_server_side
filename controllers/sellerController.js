import Mobile from '../modals/Mobile.js';

export const getSellerMobiles = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const mobiles = await Mobile.find({ 'sellerInfo.id': sellerId });

    if (mobiles && mobiles.length !== 0) {
      res.status(202).json({ mobiles });
    } else {
      res.status(400).json({ msg: 'You have not added any mobile yet!' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const deleteSellerMobile = async (req, res) => {
  const { id } = req.params;

  try {
    const mobile = await Mobile.findByIdAndDelete(id);

    if (mobile) {
      res.status(200).json({ msg: 'Successfully deleted a mobile' });
    } else {
      res.status(404).json({ msg: 'Could not delete a mobile' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const updateSellerMobile = async (req, res) => {
  const { mobileId: id } = req.params;

  try {
    const mobile = await Mobile.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (mobile) {
      res.status(200).json({ mobile });
    } else {
      res.status(404).json({ msg: 'Could not update the mobile!' });
    }
  } catch (err) {
    res.json(404).json({ msg: err.message });
  }
};
