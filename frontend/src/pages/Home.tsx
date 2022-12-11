import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const buttonClickHandler = () => {
        navigate('/take-photo');
    }

    return <Button style={{ marginTop: '25rem' }} onClick={buttonClickHandler} variant='primary' size='lg'>Začni kviz!</Button>
}

export default Home;
