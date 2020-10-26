import { Paper } from '@material-ui/core';
import './index.scss';
import { Card, Button, InputGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditingTaskId } from '../../redux/actions/tasksActionCreator';
import { showAlert } from '../../redux/actions/appActionCreator';
import { setEditingGroupId } from '../../redux/actions/groupActionCreator';
import { createItemReq } from '../../redux/actions/groupsOrTasksActionCreator';

export default ({ users = useSelector(state => state.users.users), group, task, groupId, slider }) => {
    const dispatch = useDispatch();
    const { personalInfo: { nickName: myUserNickName, _id: myUserId } } = useSelector(state => state.myUser);
    const { editingGroupId } = useSelector(state => state.groups);
    const { editingTaskId } = useSelector(state => state.tasks);
    const type = group ? 'Group' :
        task ? 'Task' : 'Item';
    const restmen = group ? users.filter((user) => user._id !== myUserId).map((user) => ({ _id: user._id })) : users.map((user) => ({ _id: user._id }));
    const initInputValues = {
        title: '',
        description: '',
        restmen,
        workers: []
    }
    if (group) initInputValues.tags = '';
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputValues, setInputValues] = useState(initInputValues);
    const [modal, setModal] = useState(false);

    const handleChange = (prop) => (event) => {
        setInputValues({ ...inputValues, [prop]: event.target.value });
    };

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    const moveUser = (id, fromArr, toArr) => {
        setInputValues({
            ...inputValues,
            [toArr]: [...inputValues[toArr], ...inputValues[fromArr].filter((user) => user._id === id)],
            [fromArr]: inputValues[fromArr].filter((user) => user._id !== id)
        });
    }

    const setVisibility = isVisible => isVisible ? '' : ' invisible';

    const showModal = () => {
        if (editingGroupId || editingTaskId) {
            toggle()
        } else {
            changeFormVisibility()
        }
    }

    const changeFormVisibility = () => {
        toggle(false);
        if (!isFormVisible) {
            dispatch(setEditingGroupId())
            dispatch(setEditingTaskId())
        }
        setIsFormVisible(!isFormVisible);
        slider();
    }

    const toggle = (value = !modal) => {
        setModal(value);
    }

    const sendRequest = () => {
        const { workers, title, tags } = inputValues
        if ((title && group) || (title && workers.length && task)) {
            let requestData;
            if (group) {
                console.log('input', inputValues.workers)

                requestData = {
                    data: { ...inputValues, users: [...inputValues.workers.map((user) => user._id), myUserId], tags: [...tags.split(' ')] },
                    type: type.toLowerCase()
                }
                delete requestData.data.workers;
                console.log('output', requestData)
            } else {
                requestData = {
                    data: { ...inputValues, groupId },
                    type: type.toLowerCase()
                }
            }

            delete requestData.data.restmen;

            dispatch(createItemReq(requestData));
            changeFormVisibility();
            setInputValues(initInputValues);
        } else {
            console.log('title', !title, 'workers', !workers.length)
            if (!title && !workers.length && task) {
                dispatch(showAlert("Need to fill title and workers."));
            } else if (!title) {
                dispatch(showAlert("Need to fill title."));
            } else {
                dispatch(showAlert("Need to add at least one worker."));
            }

        }
    }

    const tagsRender = () => {
        return group ?
            <Input className="input-size" value={inputValues.tags} onChange={handleChange('tags')} name="tags" placeholder='tags...' /> :
            <div></div>
    }

    useEffect(() => {
        let restmen = group ?
            users.filter((user) => user.nickName !== myUserNickName) : users;
            restmen.map((user) => ({ _id: user._id }));
        setInputValues({ ...inputValues, restmen })

    }, [users])

    useEffect(() => {
        if ((editingGroupId || editingTaskId) && isFormVisible) changeFormVisibility()

    }, [editingGroupId, editingTaskId])

    return (
        <div className='creating-area'>
            <Card body className='card__custom list-item-card purple-theme_back'>
                <InputGroup className="new-task-area">

                    <Input className="input-size" value={inputValues.title} onChange={handleChange('title')} name="title" placeholder={`${type} title...`} />
                    {tagsRender()}
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle caret className="control-buttons_width">Add workers</DropdownToggle>
                        <DropdownMenu>
                            {
                                inputValues.restmen.length ? 
                                    inputValues.restmen
                                        .map((user) => 
                                            <DropdownItem onClick={() => moveUser(user._id, 'restmen', 'workers')} key={user._id} >
                                                {users.find((item) => item._id === user._id) ? users.find((item) => item._id === user._id).nickName : 'Anon'}
                                            </DropdownItem>) :
                                    <DropdownItem disabled>{`No more ${group ? 'friends' : 'users'}`}</DropdownItem>
                            }
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
                <InputGroup className="">
                    <Input className="input-size textarea_heigth" type="textarea" value={inputValues.description} onChange={handleChange('description')} name="description" placeholder="Description..." />
                    <Paper elevation={0} className="form-control group-input-area control-buttons_width">
                        {group ? <div ><span>{myUserNickName}</span> <hr /></div> : <></>}
                        {inputValues.workers.map((worker) => <div key={worker._id}><span>{users.find((item) => item._id === worker._id).nickName}</span><div onClick={() => moveUser(worker._id, 'workers', 'restmen')}><CloseIcon className="close-cross" fontSize="small" /></div></div>)}
                    </Paper>
                </InputGroup>
            </Card>
            <div className="flex-center">
                <Button onClick={showModal} className={'add-button' + setVisibility(!isFormVisible)}><AddIcon />New {type}</Button>
                <Button onClick={changeFormVisibility} className={'add-button' + setVisibility(isFormVisible)}><KeyboardBackspaceIcon />Close</Button>
                <Button onClick={() => setInputValues(initInputValues)} className={'add-button' + setVisibility(isFormVisible)}>Clean</Button>
                <Button onClick={sendRequest} className={'add-button' + setVisibility(isFormVisible)}>Create<KeyboardBackspaceIcon className="rotate-icon" /></Button>
            </div>


            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader >Warning!</ModalHeader>
                <ModalBody>
                    if you continue, all changes will be deleted and can't be restored.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={changeFormVisibility}>Ok</Button>{' '}
                    <Button color="secondary" onClick={() => toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}