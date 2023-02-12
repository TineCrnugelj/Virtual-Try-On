import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {deleteQuestion, getQuestions, saveQuestions} from "../features/questions/questionSlice";
import {toast} from "react-toastify";
import classes from "../components/EditQuestion.module.css";
import {FaPlus, FaTrash} from "react-icons/fa";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Edit = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {questions} = useAppSelector(state => state.questions);
    const [questionDraggables, setQuestionDraggables] = useState(questions);

    useEffect(() => {
        dispatch(getQuestions());
    }, []);

    useEffect(() => {
        setQuestionDraggables(questions);
    }, [questions]);

    function handleDeleteButtonClick(id: string) {
        dispatch(deleteQuestion(id));
        toast.success('Vprašanje izbrisano', {autoClose: 2000})
    }

    const dragItem = useRef<any>(null);
    const dragOverItem = useRef<any>(null);

    const handleSort = () => {
       let _questions = [...questionDraggables];
       const draggedItemContent = _questions.splice(dragItem.current, 1)[0];
       _questions.splice(dragOverItem.current, 0, draggedItemContent);
       dragItem.current = null;
       dragOverItem.current = null;
       setQuestionDraggables(_questions);
    }

    const handleSave = () => {
        toast.success('Vprašanja so bila posodobljena!', {autoClose: 2000})
        const body = {
            questions: questionDraggables
        }
        dispatch(saveQuestions(body));
    }

    return <div style={{ display: 'block' }}>
        <div className={classes.pageHeader}>
            <h1 className="text-primary">Urejanje vprašanj</h1>
            <Button onClick={() => {navigate('/admin')}} className={classes.addBtn}><FaPlus size={25} /></Button>
        </div>
        <p className="text-secondary">Vrstni red vprašanj lahko spreminjate z miško (drag & drop)</p>
        {
            questionDraggables.map((q, i) => (
                <div className={classes.card}
                     draggable
                     onDragStart={(e) => dragItem.current = i}
                     onDragEnter={(e) => dragOverItem.current = i}
                     onDragEnd={handleSort}
                     onDragOver={e => e.preventDefault()}
                     key={q._id}
                >
                    <div className={classes.cardHeader}>
                        <h2>{q.questionText}</h2>
                        <FaTrash onClick={() => handleDeleteButtonClick(q._id)} className={classes.closeBtn} size={25} />
                    </div>
                    <ol type="A">
                        {q.answers.map((ans, i) => (
                            <li key={i}>{ans}</li>
                        ))}
                    </ol>
                </div>
            ))
        }
        <Button onClick={handleSave}>Shrani</Button>
    </div>
};

export default Edit;
