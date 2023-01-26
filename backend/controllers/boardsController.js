const asyncHandler = require('express-async-handler');

const Board = require('../models/boardModel');
const User = require('../models/userModel');

// @desc    Get Boards
// @route GET /api/Boards
// @access Private
const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find({ user: req.user.id });
  res.status(200).json(boards);
});

// @desc    Set Boards
// @route POST /api/Boards
// @access Private
const setBoard = asyncHandler(async (req, res) => {
  if (!req.body.board) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  // Seperate string to array items
  const board = await Board.create({
    board: req.body.board,
    user: req.user.id,
  });
  res.status(200).json(board);
});

// @desc    Update Boards
// @route PUT /api/Boards/:id
// @access Private
const updateBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);
  if (!board) {
    res.status(400);
    throw new Error('Board not found');
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the loggen in user matches the goal user
  if (board.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBoard);
});

// @desc    Delete Boards
// @route DELETE /api/Boards/:id
// @access Private
const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);
  if (!board) {
    res.status(400);
    throw new Error('Board not found');
  }
  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the loggen in user matches the goal user
  if (board.user.toString() !== user.id) {
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
