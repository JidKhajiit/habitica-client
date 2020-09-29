import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Nav } from 'reactstrap';
import { resetAuth } from '../../redux/actions/userActionCreator';
import MyNavItem from '../smallComponents/NavItem';
import './index.scss'


export default props => {
    const dispatch = useDispatch();
    // const [inputValues, setInputValues] = useState({

    // })
    const handleLogOutButton = () => {
        dispatch(resetAuth());
    }

    return (
        <>
            <Nav tabs>
                <div>
                    <MyNavItem href="/home" children="Home" />
                    <MyNavItem href="#" children="Tasks" disabled />
                    <MyNavItem href="/groups" children="Groups" />
                    <MyNavItem href="#" children="Another Link" disabled />
                </div>
                <Button onClick={handleLogOutButton} className="nav-item nav-link">Sign Out</Button>
            </Nav>

        </>
    )
}