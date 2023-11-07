const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  city: {
    type: String,
    required: true,
  },
  profileImage: {
    data: Buffer,
    type: String, 
  },
  backgroundImage: {
    data: Buffer,
    type: String, 
  },
  rentable_items: [{
    type: Schema.Types.ObjectId, 
    ref: 'Item'
  }],
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  rentedItems:[{
    type: Schema.Types.ObjectId,
    ref:'Item'
  }],
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
  credits: [{
    type: Schema.Types.ObjectId,
    ref: 'Credit'
  }],
});

profileSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;
