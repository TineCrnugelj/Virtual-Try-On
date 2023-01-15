import {Fragment, useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {FaSignInAlt} from "react-icons/fa";
import {Button} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {login, reset} from "../features/users/userSlice";
import {useNavigate} from "react-router-dom";

import classes from './Login.module.css';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let formIsValid: boolean;

    const { user, isError, isSuccess, message } = useAppSelector((state) => state.users);

    useEffect(() => {
        if (isError) {
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

        dispatch(login(userData));
        if (!isError) {
            navigate('/admin');
            dispatch(reset());
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
                    {isError ? <p className={classes.error}>Napačno uporabniško ime ali geslo</p> : ''}
                    <Button type="submit" className={classes.btnSubmit} disabled={!formIsValid}>Login</Button>
                </div>
            </form>
        </section>
    </Fragment>;

}

export default Login;