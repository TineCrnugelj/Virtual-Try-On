import {Fragment, useEffect, useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './Login.module.css';
import {FaSignInAlt} from "react-icons/fa";
import {Button} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {login, reset} from "../features/users/userSlice";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let formIsValid: boolean;

    const { user, isError, isSuccess, message } = useAppSelector((state) => state.users);

    useEffect(() => {
        if (isError) {
            console.log('Error');
            return;
        }
        if (isSuccess || user) {
            navigate('/');
        }
    }, [user, isError, isSuccess, message, dispatch, navigate]);

    const handleUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value);
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData = { username, password };
        console.log(userData);

        dispatch(login(userData));
        if (user !== null) {
            reset();
            navigate('/admin');
            toast.success('Dobrodošli, ' + username, {autoClose: 3000});
        } else {
            setUsername('');
            setPassword('');
            toast.error('Napačno uporabniško ime ali geslo!', {autoClose: 2000});
        }
    }

    formIsValid = username !== '' && password !== '';

    return <Fragment>
        <section className={classes.container}>
            <div className={classes.head}>
                <h1>
                    <FaSignInAlt/> Prijava
                </h1>
                <p>Prosimo prijavite se</p>
            </div>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Uporabniško ime</label>
                    <input type="text" name="username" id="username" value={username} placeholder='Vnesite uporabniško ime'
                           onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label htmlFor="password">Geslo</label>
                    <input type="password" name="password" id="password" value={password}
                           placeholder='Vnesite vaše geslo' onChange={handlePasswordChange} />
                </div>
                <div>
                    <Button type="submit" className={classes.btnSubmit} disabled={!formIsValid}>Login</Button>
                </div>
            </form>
        </section>
    </Fragment>;

}

export default Login;