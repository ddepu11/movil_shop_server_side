import Mobile from '../modals/Mobile.js';

const getSellerMobiles = async (req, res) => {
  const { sellerId } = req.params;

  console.log(sellerId);

  try {
    const mobiles = await Mobile.find({ sellerId });

    if (mobiles && mobiles.length !== 0) {
      res.status(202).json({ mobiles });
    } else {
      res.status(400).json({ msg: 'there are no mobile for you!!' });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: err.message });
  }
};
export default getSellerMobiles;
