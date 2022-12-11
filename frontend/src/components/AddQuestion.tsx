import React, {useState} from "react";

import classes from './AddQuestion.module.css';
import {Button} from "react-bootstrap";

const AddQuestion = () => {
    const [questionText, setQuestionText] = useState('');

    const questionTextChanged = () => {

    }

    const submitFormHandler = () => {

    }

    return <form onSubmit={submitFormHandler}>
        <h1 className={classes.heading}>Novo vprašanje</h1>
        <div className={classes.formControl}>
            <label htmlFor="question">Vprašanje</label>
            <input type="text" id='question' value={questionText} onChange={questionTextChanged} />
        </div>
        <div className={classes.formControl}>
            <label htmlFor="question">Odgovor 1</label>
            <input type="text" id='question' value={questionText} onChange={questionTextChanged} />
            <label htmlFor="question">Odgovor 2</label>
            <input type="text" id='question' value={questionText} onChange={questionTextChanged} />
            <label htmlFor="question">Odgovor 3</label>
            <input type="text" id='question' value={questionText} onChange={questionTextChanged} />
            <label htmlFor="question">Odgovor 4</label>
            <input type="text" id='question' value={questionText} onChange={questionTextChanged} />
        </div>
        <Button>Dodaj</Button>
    </form>

}

export default AddQuestion;