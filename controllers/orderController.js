import Razorpay from 'razorpay';

const createOrder = (req, res) => {
  let { amount } = req.body;
  amount *= 100;
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  const instance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount, // amount in the smallest currency unit
    currency: 'INR',
    receipt: 'order_rcptid_11',
  };

  instance.orders.create(options, (err, order) => {
    if (err) res.status(404).json({ msg: err });

    if (!err) res.status(200).json({ order, msg: 'Got the request' });
  });
};

export default createOrder;
