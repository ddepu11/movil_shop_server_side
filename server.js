import app from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

await mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
