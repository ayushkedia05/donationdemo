const mongoose = require('mongoose');
// const { number } = require('sharp/lib/is');

const validator = require('validator');

const touSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'A tour must have a name'],
    unique: true,
    trim: true

    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },

  address: {
    type: String
    // required: [true, 'A tour must have a difficulty'],
  },
  email: {
    type: String,
    required: [true, 'provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a vaild email']
  },
  phonenumber: {
    type: Number
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number
    // required: [true, 'A tour must have a price']
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String
  },
  imageCover: {
    type: String
    // required: [true, 'A tour must have a cover image']
  },

  images: [String],
  days: {
    type: Number
  }
});

const Tour = mongoose.model('Tour', touSchema);
module.exports = Tour;
