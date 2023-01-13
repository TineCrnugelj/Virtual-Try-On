import React, {useMemo} from "react";

import classes from './EditQuestion.module.css'
import {FaTrash} from "react-icons/fa";
import {useAppDispatch} from "../app/hooks";
import {deleteQuestion} from "../features/questions/questionSlice";
import {toast} from "react-toastify";

const EditQuestion: React.FC<{id: string, questionText: string, answers: string[], index: number}> = ({id, questionText, answers, index}) => {
    const dispatch = useAppDispatch();

    const answerItems = useMemo(() => {
        return answers.map((answer, i) => {
            return <li key={i}>{answer}</li>
        }
        )}, [answers]);

    function handleDeleteButtonClick() {
        dispatch(deleteQuestion(id));
        toast.success('Vprašanje izbrisano', {autoClose: 2000})
    }

    return <div className={classes.card}>
        <div className={classes.cardHeader}>
            <h2>{questionText}</h2>
            <FaTrash onClick={handleDeleteButtonClick} className={classes.closeBtn} size={25} />
        </div>
        <ol>
            {answerItems}
        </ol>
    </div>
}

export default EditQuestion;
