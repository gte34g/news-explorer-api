const mongoose = require('mongoose');

const articleUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    require: true,
    validate: {
      validator: (value) => articleUrl.test(value),
      message: (type) => `${type.value} is not valid URL`,
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator: (value) => articleUrl.test(value),
      message: (type) => `${type.value} is not valid URL`,
    },
  },
  Date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
