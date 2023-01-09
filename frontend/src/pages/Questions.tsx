import React, {useEffect} from "react";
import {useMultiStepForm} from "../hooks/useMultiStepForm";
import {getQuestions} from "../features/questions/questionSlice";
import Question from '../components/Question';
import {FaArrowRight, FaArrowLeft} from "react-icons/fa";

import classes from './Questions.module.css';
import {useAppDispatch, useAppSelector} from "../app/hooks";

const Questions = () => {
    const {questions} = useAppSelector(state => state.questions);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getQuestions());
    }, []);

    const questionElements = questions.map((q, i) => {
       return <Question questionText={q.questionText} answers={q.answers} index={i+1} />
    });

    const {
        currentStepIndex,
        currentStep,
        back,
        next
    } = useMultiStepForm(questionElements);

    return (
        <div className={classes.questionContainer}>
            <form>
                <div className={classes.question}>
                    {currentStep}
                </div>
                <div style={{marginTop: '1rem', marginBottom: '.5rem', marginRight: '.5rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end'}}>
                    {currentStepIndex !== 0 && <FaArrowLeft className={classes.arrowBtnLeft} size={35} onClick={back} />}
                    <FaArrowRight className={classes.arrowBtnRight} onClick={next} size={35} />
                </div>
            </form>
        </div>
    );
};

export default Questions;