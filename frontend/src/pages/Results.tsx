import sample from '../images/sample.jpg';

import classes from './Results.module.css';

const Results = () => {
    return (
        <div style={{ display: 'block' }}>
            <h1 className={classes.heading}>Rezultati</h1>
            <img style={{ marginTop: '3rem' }} src={sample} alt="sample" />
        </div>
    );
}

export default Results;