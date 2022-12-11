import React from "react";
import classes from "./Question.module.css";

const AnswerOption: React.FC<{answerText: string, isSelected: boolean, index: number, selectAnswer: (index: number) => void}> = ({answerText, isSelected, index, selectAnswer}) => {
    const answerClickHandler = () => {
        selectAnswer(index);
    }

    return (
        <div className={isSelected ? classes.answerOptionSelected : classes.answerOption} onClick={answerClickHandler}>
            <li className={classes.answerText} key={Math.random()}>{answerText}</li>
        </div>
    );
};

export default AnswerOption;