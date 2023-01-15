const express = require('express');
const router = express.Router();

const ctrlQuestions = require('../controllers/questions');

router.get('/questions', ctrlQuestions.getAllQuestions);

router.post('/questions', ctrlQuestions.postAddQuestion);

router.post('/questions/save', ctrlQuestions.postSaveQuestions);

router.delete('/questions/:questionId', ctrlQuestions.deleteQuestion);

module.exports = router;
