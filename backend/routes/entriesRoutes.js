const express = require('express');
const router = express.Router();
const {
  getEntries,
  setEntry,
  updateEntry,
  deleteEntry,
} = require('../controllers/entryController');

router.route('/').get(getEntries).post(setEntry);
router.route('/:entryId').delete(deleteEntry).put(updateEntry);

module.exports = router;
