const asyncHandler = require('express-async-handler');

const Board = require('../models/boardModel');
const User = require('../models/userModel');

// @desc    Get boards
// @route   GET /api/boards
// @access  Private
const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find({ user: req.user.id });

  res.status(200).json(boards);
});

// @desc    Set board
// @route   POST /api/boards
// @access  Private
const setBoard = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const board = await Board.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(board);
});

// @desc    Update board
// @route   PUT /api/boards/:id
// @access  Private
const updateBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(400);
    throw new Error('Board not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the board user
  if (board.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBoard);
});

// @desc    Delete board
// @route   DELETE /api/boards/:id
// @access  Private
const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(400);
    throw new Error('Board not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the board user
  if (board.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await board.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBoards,
  setBoard,
  updateBoard,
  deleteBoard,
};
