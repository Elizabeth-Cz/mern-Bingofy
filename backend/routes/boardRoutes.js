const express = require('express');
const router = express.Router();
const {
  getBoards,
  setBoard,
  updateBoard,
  deleteBoard,
  getBoard,
} = require('../controllers/BoardsController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getBoards).post(protect, setBoard);
router
  .route('/:id')
  .delete(protect, deleteBoard)
  .put(protect, updateBoard)
  .get(getBoard);

module.exports = router;
