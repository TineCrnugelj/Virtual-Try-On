import React, {useEffect} from "react";
import {useMultiStepForm} from "../hooks/useMultiStepForm";
import {getQuestions} from "../features/questions/questionSlice";
import Question from './Question';
import {FaArrowRight, FaArrowLeft} from "react-icons/fa";

import classes from './Questions.module.css';
import {useAppDispatch, useAppSelector} from "../app/hooks";

const Questions = () => {
    const {questions} = useAppSelector(state => state.questions);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getQuestions());
        console.log(questions);
    }, []);

    const questionElements = questions.map((q, i) => {
       return <Question questionText={q.questionText} answers={q.answers} index={i+1} />
    });

    const {
        steps,
        currentStepIndex,
        currentStep,
        back,
        next
    } = useMultiStepForm(questionElements);

    return (
        <div className={classes.questionContainer}>
            <form>
                <div style={{position: 'absolute', top: '.5rem', right: '.5rem'}}>{currentStepIndex + 1} / {steps.length}</div>
                <div className={classes.question}>
                    {currentStep}
                </div>
                <div style={{marginTop: '1rem', marginBottom: '.5rem', marginRight: '.5rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end'}}>
                    {currentStepIndex !== 0 && <FaArrowLeft className={classes.arrowBtn} size={35} onClick={back} />}
                    <FaArrowRight className={classes.arrowBtn} onClick={next} size={35} />
                </div>
            </form>
        </div>
    );
};

export default Questions;