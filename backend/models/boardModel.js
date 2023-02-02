const mongoose = require('mongoose');

const boardSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    boardInfo: {
      title: {
        type: String,
        required: [true, 'Please add a title'],
      },
      cells: {
        type: [String],
        required: [true, 'Please add cells content'],
      },
      tags: { type: [String] },
      category: {
        type: String,
        required: [true, 'Please add a category'],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Board', boardSchema);

// {
//   "boardInfo": {
//       "title": "my title",
//       "cells": ["First cell", "Second cell"],
//       "tags": ["first tag", "second tag"],
//       "category": "a category"
//       }
// }
