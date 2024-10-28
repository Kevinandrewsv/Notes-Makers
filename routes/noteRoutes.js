const express = require('express');
const {
  allNotes,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');
const router = express.Router();

router.get('/', allNotes);
router.post('/', createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);
module.exports = router;
