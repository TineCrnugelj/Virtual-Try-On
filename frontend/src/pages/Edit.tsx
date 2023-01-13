import {Fragment, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getQuestions} from "../features/questions/questionSlice";
import EditQuestion from "../components/EditQuestion";
import {DndContext, closestCenter} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

const Edit = () => {
    const dispatch = useAppDispatch();
    const {questions} = useAppSelector(state => state.questions);
    const questionItems = useMemo(() => {
        return questions.map((q, i) => {
           return <EditQuestion id={q._id} questionText={q.questionText} answers={q.answers} index={i+1} key={i} />
        });
    }, [questions]);

    useEffect(() => {
        dispatch(getQuestions());
    }, []);

    return <div style={{ display: 'block' }}>
        <h1>Urejanje vprašanj</h1>
        {questionItems}
    </div>
};

export default Edit;
