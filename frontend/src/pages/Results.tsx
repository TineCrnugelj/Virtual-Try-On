import plaza from '../images/tine3_plaza.jpg';
import poletje from '../images/tine3_poletje.jpg';
import prostiCas from '../images/tine3_prosti_cas.jpg';

import classes from './Results.module.css';
import {useAppSelector} from "../app/hooks";
import {useEffect, useState} from "react";

const Results = () => {
    const score = useAppSelector(state => state.questions.score);
    const [style, setStyle] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const initialSum = 0;
        const sum = score.reduce(
            (acc, curr) => acc + curr,
            initialSum
        )
        if (sum >= 5 && sum <= 10) {
            setStyle('Prosti čas');
            setImage(prostiCas);
        } else if (sum >= 10 && sum <= 15) {
            setStyle('Poletje');
            setImage(poletje);
        } else {
            setStyle('Plaža');
            setImage(plaza);
        }
    }, [score]);

    return (
        <div style={{ display: 'block' }}>
            <h1 className={classes.heading}>Rezultati</h1>
            <h4 className="text-primary">Vaš stil je: {style}</h4>
            <img style={{ marginTop: '3rem' }} src={image} alt="result image" />
        </div>
    );
}

export default Results;
