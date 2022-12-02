import React, {Fragment, useMemo} from "react";

import classes from './Question.module.css';
import AnswerOption from "./AnswerOption";

const Question: React.FC<{question: string, answers: string[], index: number}> = ({question, answers, index}) => {
    const selectAnswer = (index: number) => {
        answerElements[index] = <AnswerOption key={index} answerText='blabla' isSelected={true} index={index} selectAnswer={selectAnswer} />
        console.log(answerElements);
    }

    const answerElements = answers.map((a, i) => {
        return <AnswerOption key={i} answerText={a} isSelected={false} index={i} selectAnswer={selectAnswer} />;
    });

    return <Fragment>
        <h1 className={classes.questionText}>{index + '. ' + question}</h1>
        <ol style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {answerElements}
        </ol>
    </Fragment>
}

export default Question;