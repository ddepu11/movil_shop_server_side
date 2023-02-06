import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 4000;
const { DB_URI } = process.env;

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};

connectToDB()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is up and running on port ${PORT}`);
    })
  )
  .catch(() => console.log(`Could not connect to DATABASE!!!`));
