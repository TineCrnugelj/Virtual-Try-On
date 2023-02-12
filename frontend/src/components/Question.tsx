import React, {Fragment, useEffect, useState} from "react";

import classes from './Question.module.css';
import AnswerOption from "./AnswerOption";
import {setIndices} from "../features/questions/questionSlice";
import {useAppDispatch} from "../app/hooks";

const Question: React.FC<{questionText: string, answers: string[], index: number}> = ({questionText, answers, index}) => {
    const [answerEls, setAnswerEls] = useState<React.ReactElement[]>([]);
    const [hasClass, setHasClass]   = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setHasClass(false);
        const answerElements = answers.map((a, i) => {
            return <AnswerOption key={i} answerText={a} isSelected={false} index={i} selectAnswer={selectAnswer} />;
        });
        setAnswerEls(answerElements);
        setTimeout(() => {
            setHasClass(true);
        }, 20)
    }, [answers]);

    const selectAnswer = (index: number) => {
        const answerElements = [];
        dispatch(setIndices(index));
        for (let i = 0; i < answers.length; i++) {
            if (i === index) {
                answerElements.push(<AnswerOption key={i} answerText={answers[i]} isSelected={true} index={i} selectAnswer={selectAnswer} />)
            } else {
                answerElements.push(<AnswerOption key={i} answerText={answers[i]} isSelected={false} index={i} selectAnswer={selectAnswer} />);
            }
        }
        setAnswerEls(answerElements);
    }

    return <div className={hasClass ? classes.questionContainer : ''}>
        <h1 style={{ marginTop: '.5rem' }} className={classes.questionText}>{index + '. ' + questionText}</h1>
        <ol style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {answerEls}
        </ol>
    </div>
}

export default Question;