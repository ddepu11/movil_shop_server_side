import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  title: {
    type: String,
  },
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
