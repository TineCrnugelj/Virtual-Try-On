import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.css';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {logout, reset} from "../features/users/userSlice";
import {FaPlus, FaPen} from "react-icons/fa";
import classes from './NavBar.module.css';
import {Fragment, useState} from "react";
import {NavDropdown} from "react-bootstrap";

function ColorSchemesExample() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user  = useAppSelector(state => state.users.user);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    const handleAdminClick = () => {
        navigate('/admin');
    }

    const handleEditClick = () => {
        navigate('/edit');
    }

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Virtual Try-On</Navbar.Brand>
                <Nav className="me-auto">
                    {!user ?
                        <Fragment>
                            <Nav.Link>
                                <NavLink className={(navData) => navData.isActive ? classes.active : classes.active} to="/login">Prijava</NavLink>
                            </Nav.Link>

                        </Fragment>
                         :
                        <Fragment>
                            <Nav.Link>
                                <a className={classes.active} onClick={onLogout}>Odjava</a>
                            </Nav.Link>
                            <Nav.Link>
                            <NavDropdown
                                title={<span className="text-white">Admin</span>}
                            >
                                    <NavDropdown.Item onClick={handleAdminClick}><FaPlus /> Novo vprašanje</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleEditClick}><FaPen/> Urejanje vprašanj</NavDropdown.Item>
                                </NavDropdown>
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