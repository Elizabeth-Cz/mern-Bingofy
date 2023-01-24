const express = require('express');
const router = express.Router();
const {
  getBoards,
  setBoard,
  updateBoard,
  deleteBoard,
} = require('../controllers/boardsController');

router.route('/').get(getBoards).post(setBoard);
router.route('/:id').delete(deleteBoard).put(updateBoard);

module.exports = router;
