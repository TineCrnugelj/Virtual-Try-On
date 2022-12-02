import React from "react";
import {QuestionIF} from "../classes/QuestionIF";
import {useMultiStepForm} from "../hooks/useMultiStepForm";
import Question from '../components/Question';

import classes from './Questions.module.css';

const Questions: React.FC<{questions: QuestionIF[]}> = ({questions}) => {
    const questionElements = questions.map((q, i) => {
       return <Question question={q.question} answers={q.answers} index={i+1} />
    });

    const {
        steps,
        currentStepIndex,
        currentStep,
        isFirstStep,
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
                <div style={{marginTop: '1rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end'}}>
                    {currentStepIndex !== 0 && <button type='button' onClick={back}>Back</button>}
                    <button type='button' onClick={next}>Next</button>
                </div>
            </form>
        </div>
    );
};

export default Questions;