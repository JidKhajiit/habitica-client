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
        task ? 'Task' : 'Item'
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputValues, setInputValues] = useState({
        title: '',
        tags: '',
        description: '',
        restmen: users,
        workers: []
    });

    useEffect(() => { setInputValues({ ...inputValues, restmen: users.map((user) => user._id) }) }, [users])

    console.log('azazazaz', inputValues.restmen, users);

    const handleChange = (prop) => (event) => {
        setInputValues({ ...inputValues, [prop]: event.target.value });
    };

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    const moveUser = (id, fromArr, toArr) => {
        setInputValues({
            ...inputValues,
            [toArr]: [...inputValues[toArr], ...inputValues[fromArr].filter((userId) => userId === id)],
            [fromArr]: inputValues[fromArr].filter((userId) => userId !== id)
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
            console.log(requestData);
            dispatch(createTaskOrGroupReq(requestData));
            changeFormVisibility()
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
                            {inputValues.restmen.map((userId) => <DropdownItem onClick={() => moveUser(userId, 'restmen', 'workers')} key={userId} >{users.find((item) => item._id == userId).nickName}</DropdownItem>)}
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
                <InputGroup className="">
                    <Input className="input-size" type="textarea" value={inputValues.description} onChange={handleChange('description')} name="description" placeholder="Description..." />
                    <Paper elevation={0} className="form-control group-input-area group-button-size">
                        {inputValues.workers.map((workerId) => <div key={workerId}><span>{users.find((item) => item._id == workerId).nickName}</span><div onClick={() => moveUser(workerId, 'workers', 'restmen')}><CloseIcon className="close-cross" fontSize="small" /></div></div>)}
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