const asyncHandler = require('express-async-handler');

// @desc    Get entries
// @route GET /api/entries
// @access Private
const getEntries = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get entries' });
});

// @desc    Set entries
// @route POST /api/entries
// @access Private
const setEntry = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  res.status(200).json({ message: 'Set entry' });
});

// @desc    Update entries
// @route PUT /api/entries/:entryId
// @access Private
const updateEntry = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update entry ${req.params.entryId}` });
});

// @desc    Delete entries
// @route DELETE /api/entries/:entryId
// @access Private
const deleteEntry = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete entry ${req.params.entryId}` });
});

module.exports = {
  getEntries,
  setEntry,
  updateEntry,
  deleteEntry,
};
