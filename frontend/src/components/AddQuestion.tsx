import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import AnswerInput from "./AnswerInput";
import { toast } from 'react-toastify';
import classes from './AddQuestion.module.css';
import {useAppDispatch} from "../app/hooks";
import {createQuestion} from "../features/questions/questionSlice";

const AddQuestion = () => {
    const dispatch = useAppDispatch();
    const [questionText, setQuestionText]     = useState('');
    const [answers, setAnswers]               = useState<string[]>([]);
    const [numOfAnswers, setNumOfAnswers]     = useState(2);
    const [answerElements, setAnswerElements] = useState<React.ReactElement[]>([]);
    const [disabled, setDisabled]             = useState(true);

    useEffect(() => {
        setAnswerElements([
            <AnswerInput key={0} index={0} setInput={setInput} />,
            <AnswerInput key={1} index={1} setInput={setInput}/>
        ]);
        setAnswers(Array(numOfAnswers).fill(''));
    }, []);

    const setInput = (index: number, text: string) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = text;

            return newAnswers;
        });
    }

    const questionTextChanged = (e: React.FormEvent<HTMLInputElement>) => {
        setQuestionText(e.currentTarget.value);
        if (e.currentTarget.value.trim() === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            questionText,
            answers
        };
        dispatch(createQuestion(body));
        toast.success('Novo vprašanje uspešno dodano!');
    }

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNumOfAnswers(+e.currentTarget.value);
        const newAnswerInputs = [];
        for (let i = 0; i < +e.currentTarget.value; i++) {
            newAnswerInputs.push(<AnswerInput key={i} index={i} setInput={setInput} />);
        }
        setAnswerElements(newAnswerInputs);
    }

    const allAnswersNotEmpty = (answers: string[]) => {
        return answers.some(ans => ans !== '');
    }

    return <form onSubmit={submitFormHandler}>
        <h1 className={classes.heading}>Novo vprašanje</h1>
        <div className={classes.formControl} style={{ marginBottom: '1rem' }}>
            <label htmlFor="question">Vprašanje</label>
            <input type="text" id='question' value={questionText} onChange={questionTextChanged} />
        </div>
        <label style={{ margin: '0 .5rem 1rem 0' }} htmlFor="answers">Število odgovorov:</label>
        <select id="cars" value={numOfAnswers} onChange={selectHandler}>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
        </select>
        {answerElements}
        <Button disabled={disabled} style={{ margin: '1rem 0 0 2rem'}} type='submit'>Dodaj</Button>
    </form>

}

export default AddQuestion;