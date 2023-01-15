import classes from "./AddQuestion.module.css";
import React, {useState} from "react";

const AnswerInput: React.FC<{index: number, setInput: (index: number, text: string) => void}> = ({index, setInput}) => {
    const [value, setValue] = useState('');

    const valueChanged = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        setInput(index, e.currentTarget.value);
    }

    return <div className={classes.formControl} key={index}>
        <label htmlFor="question">Odgovor {index+1}</label>
        <input type="text" id='question' value={value} onChange={valueChanged} />
    </div>
}

export default AnswerInput;