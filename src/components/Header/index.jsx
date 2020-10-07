import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Nav, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
            {/* <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader >Are you sure?</ModalHeader>
                <ModalBody>
                    if you continue, the {type} will be deleted and can't be restored.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleDeleteButton}>{`Delete ${type}`}</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal> */}
            <Nav tabs>
                <div key="1">
                    <MyNavItem href="/home" children="Home" />
                    <MyNavItem href="#" children="Tasks" disabled />
                    <MyNavItem href="/groups" children="Groups" />
                    <MyNavItem href="#" children="Another Link" disabled />
                </div>
                <div>
                    <MyNavItem href='#' children={nickName} disabled />
                    <Button onClick={handleLogOutButton} className="nav-item nav-link">Sign Out</Button>
                </div>
            </Nav>
        </>
    )
}