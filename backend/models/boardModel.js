const { text } = require('express');
const mongoose = require('mongoose');

const boardSchema = mongoose.Schema(
  {
    board: {
      type: String,
      required: [true, 'Please fill slot'],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Board', boardSchema);
