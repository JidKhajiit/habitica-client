import React, { useState } from 'react'
import { Button, Modal, Card, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './index.scss'
import '../../../app.scss'
import { useDispatch } from 'react-redux';
import { deleteItem, setEditingTaskId } from '../../../redux/actions/tasksActionCreator';
import { setEditingGroupId, getEditingGroupUsers, setEditingGroupUsers } from '../../../redux/actions/groupActionCreator';

const ListItemCard = ({
    id,
    className,
    children,
    onClick,
    type,
    groupId,
    completed,
}) => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const handleEditButton = () => {
        if(type === "task") {
            dispatch(setEditingTaskId(id))
        } else {
            dispatch(setEditingGroupUsers())
            dispatch(getEditingGroupUsers(id))
            dispatch(setEditingGroupId(id))
        }
    }

    const handleDeleteButton = () => {
        console.log(id)
        dispatch(deleteItem({ id, type, groupId }))
    }

    return (
        <Card body id={id} key={id} onClick={onClick} className={"card__custom list-item-card hover_recolor purple-theme_back " + className}>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader >Are you sure?</ModalHeader>
                <ModalBody>
                    if you continue, the {type} will be deleted and can't be restored.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleDeleteButton}>{`Delete ${type}`}</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <div className={`custom-card__control-buttons`}>
                {!completed ? <Button size="sm" color="success" className="edit-button purple-theme_success" onClick={handleEditButton}>Edit</Button> : <></>}
                <Button size="sm" color="danger" className="delete-button purple-theme_danger" onClick={toggle}>Delete</Button>
            </div>
            {children}
        </Card>
    )
}

export default ListItemCard