import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import questionService from "./questionService";
import {QuestionBody} from "../../classes/QuestionIF";

interface QuestionState {
    questions: {id: number, questionText: string, answers: string[]}[]
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    message: string
}

const initialState: QuestionState = {
    questions: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const getQuestions = createAsyncThunk('questions/getAll', async (_, thunkAPI) => {
    try {
        return await questionService.getQuestions();
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const createQuestion = createAsyncThunk('questions/createQuestion', async (questionData: QuestionBody, thunkAPI) => {
    try {
        return await questionService.postQuestion(questionData);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {

    },
    extraReducers: (builder => {
        builder
            .addCase(getQuestions.pending, state => {
                state.isLoading = true
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.questions = action.payload
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // @ts-ignore
                state.message = action.payload
            })
            .addCase(createQuestion.pending, state => {
                state.isLoading = true
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.questions.push(action.payload)
            })
            .addCase(createQuestion.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // @ts-ignore
                state.message = action.payload
            })
    })
})

export default questionSlice.reducer
