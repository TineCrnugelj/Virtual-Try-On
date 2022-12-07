import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.css';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {logout, reset} from "../features/users/userSlice";

import classes from './NavBar.module.css';
import {Fragment} from "react";

function ColorSchemesExample() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user  = useAppSelector(state => state.users.user);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">Virtual Try-On</Navbar.Brand>
                <Nav className="me-auto">
                    {!user ?
                        <Fragment>
                            <Nav.Link>
                                <NavLink className={(navData) => navData.isActive ? classes.active : classes.active} to="/login">Login</NavLink>
                            </Nav.Link>

                        </Fragment>
                         :
                        <Fragment>
                            <Nav.Link>
                                <a className={classes.active} onClick={onLogout}>Logout</a>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink className={(navData) => navData.isActive ? classes.active : classes.active} to="/admin">Admin</NavLink>
                            </Nav.Link>
                        </Fragment>
                    }
                </Nav>
                {user ? <Nav className="me-auto">

                        </Nav> : ''
                }
            </Container>
        </Navbar>
    );
}

export default ColorSchemesExample;