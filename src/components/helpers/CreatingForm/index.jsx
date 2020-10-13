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
import { createTaskOrGroupReq } from '../../../redux/actions/tasksActionCreator';
import { showAlert } from '../../../redux/actions/appActionCreator';

export default ({ users = useSelector(state => state.users.users), group, task, groupId }) => {
    const dispatch = useDispatch();
    const { personalInfo: { nickName: myUserNickName, _id: myUserId } } = useSelector((state => state.myUser))
    const type = group ? 'Group' :
        task ? 'Task' : 'Item';
    const restmen = group ? users.filter((user) => user._id !== myUserId).map((user) => ({ _id: user._id })) : users.map((user) => ({ _id: user._id }));
    const initInputValues = {
        title: '',
        description: '',
        restmen,
        workers: []
    }
    if (group) {
        initInputValues.tags = '';
        // const myIndex = initInputValues.restmen.indexOf({_id: group._id})
        // console.log(group)
        // console.log(initInputValues.restmen)
        // console.log(myIndex)
        // initInputValues.restmen.splice(initInputValues.restmen, 1)
    }
    const [isFormVisible, setIsFormVisible] = useState(false);
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
        console.log(inputValues)
    }

    const setVisibility = isVisible => isVisible ? '' : ' invisible';

    const changeFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    }

    const sendRequest = () => {
        const { workers, title, tags } = inputValues
        if (title && group || title && workers.length && task) {
            let requestData;
            if (group) {
                console.log('input', inputValues.workers)

                requestData = {
                    data: { ...inputValues, users: [...inputValues.workers.map((user) => user._id), myUserId], tags: [...tags.split(' ')] },
                    type: type.toLowerCase()
                }
                delete requestData.data.workers;
                console.log('output',requestData)
            } else {
                requestData = {
                    data: { ...inputValues, groupId },
                    type: type.toLowerCase()
                }
            }

            delete requestData.data.restmen;

            dispatch(createTaskOrGroupReq(requestData));
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

    const ifGroup = () => {
        return group ?
            <Input className="input-size" value={inputValues.tags} onChange={handleChange('tags')} name="tags" placeholder='tags...' /> :
            <div></div>
    }

    useEffect(() => {
        console.log(users)
        const restmen = group ? users.filter((user) => user.nickName !== myUserNickName).map((user) => ({ _id: user._id })) : users.map((user) => ({ _id: user._id })); // repeat
        setInputValues({ ...inputValues, restmen })

    }, [users])


    return (
        <>
            <Card className={setVisibility(isFormVisible)}>
                <InputGroup className="new-task-area">

                    <Input className="input-size" value={inputValues.title} onChange={handleChange('title')} name="title" placeholder={`${type} title...`} />
                    {ifGroup()}
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle caret className="group-button-size">Add workers</DropdownToggle>
                        <DropdownMenu>
                            {inputValues.restmen.map((user) => <DropdownItem onClick={() => moveUser(user._id, 'restmen', 'workers')} key={user._id} >{users.find((item) => item._id === user._id)?users.find((item) => item._id === user._id).nickName:'Anon'}</DropdownItem>)}
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
                <InputGroup className="">
                    <Input className="input-size" type="textarea" value={inputValues.description} onChange={handleChange('description')} name="description" placeholder="Description..." />
                    <Paper elevation={0} className="form-control group-input-area group-button-size">
                        {group ? <div ><span>{myUserNickName}</span> <hr /></div> : <></>}
                        {inputValues.workers.map((worker) => <div key={worker._id}><span>{users.find((item) => item._id == worker._id).nickName}</span><div onClick={() => moveUser(worker._id, 'workers', 'restmen')}><CloseIcon className="close-cross" fontSize="small" /></div></div>)}
                    </Paper>
                </InputGroup>
            </Card>
            <div className="flex-center">
                <Button onClick={changeFormVisibility} className={'add-button' + setVisibility(!isFormVisible)}><AddIcon />New {type}</Button>
                <Button onClick={changeFormVisibility} className={'add-button' + setVisibility(isFormVisible)}><KeyboardBackspaceIcon />Close</Button>
                <Button onClick={() => setInputValues(initInputValues)} className={'add-button' + setVisibility(isFormVisible)}>Clean</Button>
                <Button onClick={sendRequest} className={'add-button' + setVisibility(isFormVisible)}>Create<KeyboardBackspaceIcon className="rotate-icon" /></Button>
            </div>
        </>

    )
}