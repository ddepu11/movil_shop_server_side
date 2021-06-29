import fs from 'fs';
import Mobile from '../modals/Mobile.js';

export const getSellerMobiles = async (req, res) => {
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

export const deleteSellerMobile = async (req, res) => {
  const { id } = req.params;

  try {
    const mobile = await Mobile.findByIdAndDelete(id);

    if (mobile) {
      const folder = `public/sellers/${mobile.sellerId}/${mobile.title}_${mobile.os}_${mobile.price}_${mobile.processor}`;

      //
      fs.readdir(folder, (err1, files) => {
        files.forEach((p) => {
          fs.unlink(`${folder}/${p}`, (err2) => {
            if (err2) console.log(err2);
          });
        });
      });

      res.status(200).json({ msg: 'Successfully deleted a mobile' });
    } else {
      res.status(404).json({ msg: 'Could not delete a mobile' });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
