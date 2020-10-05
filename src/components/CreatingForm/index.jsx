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
import AddIcon from '@material-ui/icons/Add';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskOrGroupReq } from '../../redux/actions/tasksActionCreator';

export default ({ users = useSelector(state => state.users.users), group, task, groupId }) => {
    const dispatch = useDispatch();
    const object = group ? 'Group' :
        task ? 'Task' : 'Item';
    const initInputValues = {
        title: '',
        tags: '',
        description: '',
        restmen: users.map((user) => ({_id: user._id})),
        workers: []
    }
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputValues, setInputValues] = useState(initInputValues);

    useEffect(() => { setInputValues({ ...inputValues, restmen: users.map((user) => ({_id: user._id})) }) }, [users])

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

    const changeFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    }

    const sendRequest = () => {
        if (inputValues.title, inputValues.workers) {
            const requestData = group ? {
                data: { ...inputValues, users: [...inputValues.workers], tags: [...inputValues.tags.split(' ')] },
                object: object.toLowerCase()
            } : {
                    data: { ...inputValues, groupId },
                    object: object.toLowerCase()
                }
            if (group) delete requestData.data.workers;
            delete requestData.data.restmen;
            
            dispatch(createTaskOrGroupReq(requestData));
            changeFormVisibility();
            setInputValues(initInputValues);
        }
    }

    const ifGroup = () => {
        return group ?
            <Input className="input-size" value={inputValues.tags} onChange={handleChange('tags')} name="tags" placeholder='tags...' /> :
            <div></div>
    }

    return (
        <>
            <Card className={setVisibility(isFormVisible)}>
                <InputGroup className="new-task-area">

                    <Input className="input-size" value={inputValues.title} onChange={handleChange('title')} name="title" placeholder={`${object} title...`} />
                    {ifGroup()}
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle caret className="group-button-size">Add workers</DropdownToggle>
                        <DropdownMenu>
                            {inputValues.restmen.map((user) => <DropdownItem onClick={() => moveUser(user._id, 'restmen', 'workers')} key={user._id} >{users.find((item) => item._id == user._id).nickName}</DropdownItem>)}
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
                <InputGroup className="">
                    <Input className="input-size" type="textarea" value={inputValues.description} onChange={handleChange('description')} name="description" placeholder="Description..." />
                    <Paper elevation={0} className="form-control group-input-area group-button-size">
                        {inputValues.workers.map((worker) => <div key={worker._id}><span>{users.find((item) => item._id == worker._id).nickName}</span><div onClick={() => moveUser(worker._id, 'workers', 'restmen')}><CloseIcon className="close-cross" fontSize="small" /></div></div>)}
                    </Paper>
                </InputGroup>
            </Card>
            <div className="flex-center">
                <Button onClick={changeFormVisibility} className={'add-button' + setVisibility(!isFormVisible)}><AddIcon />New {object}</Button>
                <Button onClick={changeFormVisibility} className={'add-button' + setVisibility(isFormVisible)}><KeyboardBackspaceIcon />Close</Button>
                <Button onClick={sendRequest} className={'add-button' + setVisibility(isFormVisible)}>Create<KeyboardBackspaceIcon className="rotate-icon" /></Button>
            </div>
        </>

    )
}