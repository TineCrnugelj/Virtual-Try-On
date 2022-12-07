import { configureStore } from '@reduxjs/toolkit';
import questionReducer from '../features/questions/questionSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
    reducer: {
        questions: questionReducer,
        users:     userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
