const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: {type: String, required: true},
    answers: [{type: String, required: true}]
});

module.exports = mongoose.model('Question', questionSchema, 'Question');
