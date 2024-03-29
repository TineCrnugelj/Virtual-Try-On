import axios from "axios";
import {QuestionBody} from "../../classes/QuestionIF";

const API_URL: string = 'http://localhost:5000/api/questions/'; // Change this, horrible

const getQuestions = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const postQuestion = async (questionData: QuestionBody) => {
    const response = await axios.post(API_URL, questionData);
    return response.data;
}

const postSaveQuestions = async (questions: {questions: QuestionBody[]}) => {
    const response = await axios.post(`${API_URL}save`, questions);
    return response.data;
}

const deleteQuestion = async (questionId: string) => {
    const response = await axios.delete(API_URL + questionId);
    return response.data;
}

const questionService = {
    getQuestions,
    postQuestion,
    deleteQuestion,
    postSaveQuestions,
}

export default questionService;
