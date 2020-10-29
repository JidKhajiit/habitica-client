import { Paper } from '@material-ui/core';
import './index.scss';
import { Card, Button, InputGroup, Input } from 'reactstrap';
import {
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditingTaskId } from '../../redux/actions/tasksActionCreator';
import { showAlert } from '../../redux/actions/appActionCreator';
import { editItem } from '../../redux/actions/groupsOrTasksActionCreator';

export default ({ users = useSelector(state => state.groups.editingGroupUsers), task }) => {
    const dispatch = useDispatch();
    const type = 'Task';
    const initInputValues = {
        title: task.title,
        description: task.description,
        restmen: users.map((user) => ({ _id: user._id })).filter((user) => !task.workers.some(worker => worker._id === user._id)),
        workers: task.workers.map((worker) => ({ _id: worker._id }))
    }
    const groupId = task.groupId;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputValues, setInputValues] = useState(initInputValues);

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

    const sendRequest = () => {
        const { title, workers } = inputValues;
        if (title && workers.length && task) {
            const requestData = {
                    data: { ...inputValues },
                    id: task._id,
                    groupId
                };
            requestData.type = type.toLowerCase();

            delete requestData.data.restmen;

            dispatch(editItem(requestData));
            setInputValues(initInputValues);
        } else {
            if (!inputValues.title && !inputValues.workers.length) {
                dispatch(showAlert("Need to fill title and workers."));
            } else if (!inputValues.title) {
                dispatch(showAlert("Need to fill title."));
            }
            dispatch(showAlert("Need to add at least one worker."));
        }
    }

    const closeEditForm = () =>  dispatch(setEditingTaskId())

    return (
        <div >
            <Card body className="task-card card__custom list-item-card purple-theme_back">
                <InputGroup className="edit-task-area">
                    <Input className="input-size" value={inputValues.title} onChange={handleChange('title')} name="title" placeholder={`${type} title...`} />
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle caret className="control-buttons_width">Add workers</DropdownToggle>
                        <DropdownMenu>
                            {inputValues.restmen.length ? inputValues.restmen.map((user) => <DropdownItem onClick={() => moveUser(user._id, 'restmen', 'workers')} key={user._id} >{users.find((item) => item._id === user._id).nickName}</DropdownItem>) :
                                <DropdownItem disabled>No more members</DropdownItem>}
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
                <InputGroup className="">
                    <Input className="input-size textarea_heigth" type="textarea" value={inputValues.description} onChange={handleChange('description')} name="description" placeholder="Description..." />
                    <Paper elevation={0} className="form-control group-input-area control-buttons_width">
                        {inputValues.workers.map((worker) => <div key={worker._id}><span>{users.find((item) => item._id === worker._id).nickName}</span><div onClick={() => moveUser(worker._id, 'workers', 'restmen')}><CloseIcon className="close-cross" fontSize="small" /></div></div>)}
                    </Paper>
                </InputGroup>
            </Card>
            <div className="flex-center">
                <Button onClick={closeEditForm} className={'add-button'}><KeyboardBackspaceIcon />Close</Button>
                <Button onClick={sendRequest} className={'add-button'}>Save<KeyboardBackspaceIcon className="rotate-icon" /></Button>
            </div>
        </div>

    )
}