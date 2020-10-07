import { Paper } from '@material-ui/core';
import './index.scss';
import '../../app.scss'
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
import { editItem, setEditingTaskId } from '../../redux/actions/tasksActionCreator';
import { showAlert } from '../../redux/actions/appActionCreator';
import { setEditingGroupId } from '../../redux/actions/groupActionCreator';

export default ({ users = useSelector(state => state.users.users), group, task, className }) => {
    const dispatch = useDispatch();
    const type = group ? 'Group' :
        task ? 'Task' : 'Item';
    const initInputValues = task ? {
        title: task.title,
        description: task.description,
        restmen: users.map((user) => ({ _id: user._id })).filter((user) => !task.workers.some(worker => worker._id === user._id)),
        workers: task.workers.map((worker) => ({ _id: worker._id }))
    } : group ? {
        title: group.title,
        tags: group.tags.join(' '),
        description: group.description,
        restmen: users.map((user) => ({ _id: user._id })).filter((user) => !group.users.some(workerId => workerId === user._id)),
        workers: group.users.map((workerId) => ({ _id: workerId }))
    } : {
                title: '',
                tags: '',
                description: '',
                restmen: users.map((user) => ({ _id: user._id })),
                workers: []
            }
    const groupId = task ? task.groupId : group._id;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputValues, setInputValues] = useState(initInputValues);

    // useEffect(() => {
    //     // if(task) {
    //     setInputValues({
    //         ...inputValues,
    //         restmen: users
    //             .map((user) => ({ _id: user._id }))
    //             .filter((user) => {
    //                 if (task) {
    //                     return !task.workers
    //                         .some(worker => worker._id === user._id)
    //                 } else {
    //                     return !group.users
    //                         .some(workerId => workerId === user._id)
    //                 }

    //             })
    //     })
    // }, [users])

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
        console.log(inputValues)
        if (inputValues.title && inputValues.workers.length) {
            const requestData = group ? {
                data: { ...inputValues, users: [...inputValues.workers], tags: [...inputValues.tags.split(' ')] },
                id: group._id
            } : {
                    data: { ...inputValues },
                    id: task._id,
                    groupId
                };
            requestData.type = type.toLowerCase();

            if (group) delete requestData.data.workers;
            delete requestData.data.restmen;

            dispatch(editItem(requestData));
            setInputValues(initInputValues);
        } else {
            const { workers } = inputValues //?????????????????????????>

            if (!inputValues.title && !!inputValues.workers) {
                dispatch(showAlert("Need to fill title and workers."));
            } else if (!inputValues.title) {
                dispatch(showAlert("Need to fill title."));
            }
            dispatch(showAlert("Need to add at least one worker."));
        }
    }

    const closeEditForm = () => {
        if (task) dispatch(setEditingTaskId())
        else dispatch(setEditingGroupId())
    }

    const ifGroup = () => {
        return group ?
            <Input className="input-size" value={inputValues.tags} onChange={handleChange('tags')} name="tags" placeholder='tags...' /> :
            <div></div>
    }

    return (
        <div>
            <Card body className="task-card card__custom list-item-card">
                <InputGroup className="new-task-area">
                    <Input className="input-size" value={inputValues.title} onChange={handleChange('title')} name="title" placeholder={`${type} title...`} />
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
                <Button onClick={closeEditForm} className={'add-button'}><KeyboardBackspaceIcon />Close</Button>
                <Button onClick={sendRequest} className={'add-button'}>Save<KeyboardBackspaceIcon className="rotate-icon" /></Button>
            </div>
        </div>

    )
}