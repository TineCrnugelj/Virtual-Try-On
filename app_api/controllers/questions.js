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

const deleteQuestion = async (req, res) => {
    const id = req.params.questionId;
    const question = await Question.findById(id);

    if (!question) {
        return res.status(404).json({message: 'Question not found'});
    }
    /*
    if (!req.user) {
        return res.status(401).json('User not found!');
    }

    if (task.user.toString() !== req.user.id) {
        return res.status(401).json('User not authorized');
    }
     */

    await question.remove()
    res.status(200).json({id: id})
}

module.exports = {
    getAllQuestions,
    postAddQuestion,
    deleteQuestion,
}