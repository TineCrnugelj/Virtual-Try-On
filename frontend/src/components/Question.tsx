import React, {Fragment, useEffect, useState} from "react";

import classes from './Question.module.css';
import AnswerOption from "./AnswerOption";

const Question: React.FC<{questionText: string, answers: string[], index: number}> = ({questionText, answers, index}) => {
    const [answerEls, setAnswerEls] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        const answerElements = answers.map((a, i) => {
            return <AnswerOption key={i} answerText={a} isSelected={false} index={i} selectAnswer={selectAnswer} />;
        });
        setAnswerEls(answerElements);
    }, [answers]);

    const selectAnswer = (index: number) => {
        const answerElements = [];
        for (let i = 0; i < answers.length; i++) {
            if (i === index) {
                answerElements.push(<AnswerOption key={i} answerText={answers[i]} isSelected={true} index={i} selectAnswer={selectAnswer} />)
            } else {
                answerElements.push(<AnswerOption key={i} answerText={answers[i]} isSelected={false} index={i} selectAnswer={selectAnswer} />);
            }
        }
        setAnswerEls(answerElements);
    }

    return <Fragment>
        <h1 className={classes.questionText}>{index + '. ' + questionText}</h1>
        <ol style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {answerEls}
        </ol>
    </Fragment>
}

export default Question;