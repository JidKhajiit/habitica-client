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
        <div style={{'textAlign': 'center', position:'fixed', bottom: 0, width: '100vw'}}>
            <span>v.1.0.0</span>
        </div>
    )
}