const Question = require('../models/Question');


const getAllQuestions = async (req, res) => {
    const questions = await Question.find();
    res.status(200).json(questions);
}

const postAddQuestion = async (req, res) => {
    const newQuestion = new Question({questionText: req.body.questionText, answers: req.body.answers});
    await newQuestion.save();

    res.status(201).json(newQuestion);
}

const postSaveQuestions = async (req, res) => {
    const newQuestions = req.body.questions;
    await Question.deleteMany({});

    for (const q of newQuestions)  {
        const newQuestion = new Question({questionText: q.questionText, answers: q.answers});
        await newQuestion.save();
    }

    res.status(201).json(newQuestions);
}

const deleteQuestion = async (req, res) => {
    const id = req.params.questionId;
    const question = await Question.findById(id);

    if (!question) {
        return res.status(404).json({message: 'Question not found'});
    }

    await question.remove()
    res.status(200).json({id: id})
}

module.exports = {
    getAllQuestions,
    postAddQuestion,
    deleteQuestion,
    postSaveQuestions,
}