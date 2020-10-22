import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Nav } from 'reactstrap';
import { resetAuth } from '../../redux/actions/myUserActionCreator';
import MyNavItem from '../smallComponents/NavItem';
import './index.scss'


export default props => {
    const dispatch = useDispatch();
    const { personalInfo: { nickName } } = useSelector(state => state.myUser);
    
    const handleLogOutButton = () => {
        dispatch(resetAuth());
    }

    return (
        <>
            <Nav tabs className="purple-theme_one">
                <div key="1">
                    <MyNavItem href="/home" children="Home" disabled/>
                    <MyNavItem href="/tasks" children="Tasks" disabled/>
                    <MyNavItem href="/groups" children="Groups" />
                    <MyNavItem href="/friends" children="Friends" />
                    <MyNavItem href="#" children="Another Link" disabled />
                </div>
                <div>
                    <MyNavItem href='#' children={nickName} style={{color: 'white'}} disabled />
                    <Button onClick={handleLogOutButton} className="nav-item ">Sign Out</Button>
                </div>
            </Nav>
        </>
    )
}