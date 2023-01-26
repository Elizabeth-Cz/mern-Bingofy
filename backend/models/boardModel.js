const mongoose = require('mongoose');

const boardSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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
