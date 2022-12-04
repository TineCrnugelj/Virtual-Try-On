import axios from "axios";

const API_URL: string = 'http://localhost:5000/api/questions'; // Change this, horrible

const getQuestions = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const questionService = {
    getQuestions,
}

export default questionService;
