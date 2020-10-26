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
import { setEditingGroupId } from '../../redux/actions/groupActionCreator';
import { editItem } from '../../redux/actions/groupsOrTasksActionCreator';

export default ({ group }) => {
    const users = useSelector(state => state.groups.editingGroupUsers);
    const dispatch = useDispatch();
    const { personalInfo: { nickName: myUserNickName, _id: myUserId } } = useSelector((state => state.myUser))
    const initInputValues = {
        title: group.title,
        tags: group.tags.join(' '),
        description: group.description,
        restmen: users.map((user) => ({ _id: user._id })).filter((user) => !group.users.some(workerId => workerId === user._id)),
        workers: group.users.map((workerId) => ({ _id: workerId })).filter((user) => user._id !== myUserId)
    } 
    const groupId = group._id;
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
        const { title, description, workers } = inputValues;
        if (title && group) {
            const requestData = {
                data: { title, description, ...inputValues, users: [...inputValues.workers.map((user) => user._id), myUserId], tags: [...inputValues.tags.split(' ')] },
                id: group._id,
                type: 'group'
            }

            dispatch(editItem(requestData));
            setInputValues(initInputValues);
        } else {
            dispatch(showAlert("Need to fill title."));
        }
    }

    const closeEditForm = () => {

        dispatch(setEditingGroupId())
    }

    return (
        <div >
            <Card body className="card__custom edit-group-form purple-theme_back">
                <Input className="input-size" value={inputValues.title} onChange={handleChange('title')} name="title" placeholder='Group title...' />
                <InputGroup className="">
                    
                    <Input className="input-size" value={inputValues.tags} onChange={handleChange('tags')} name="tags" placeholder='tags...' />
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle caret className="control-buttons_width">Add workers</DropdownToggle>
                        <DropdownMenu>
                            {inputValues.restmen.length ? inputValues.restmen.map((user) => <DropdownItem onClick={() => moveUser(user._id, 'restmen', 'workers')} key={user._id} >{users.find((item) => item._id === user._id).nickName}</DropdownItem>) :
                                <DropdownItem disabled>{`No more friends`}</DropdownItem>}
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
                <InputGroup className="">
                    <Input className="input-size textarea_heigth" type="textarea" value={inputValues.description} onChange={handleChange('description')} name="description" placeholder="Description..." />
                    <Paper elevation={0} className="form-control edit-group-form__friends-area control-buttons_width">
                        <div ><span>{myUserNickName}</span> <hr /></div>
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