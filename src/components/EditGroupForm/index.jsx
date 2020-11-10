import { Paper } from '@material-ui/core';
import './index.scss';
import {
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, 
    Card, 
    Button, 
    InputGroup, 
    Input
} from 'reactstrap';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../redux/actions/appActionCreator';
import { setEditingGroupId } from '../../redux/actions/groupActionCreator';
import { editItem } from '../../redux/actions/groupsOrTasksActionCreator';

export default ({ group }) => {
    const users = useSelector(state => state.groups.editingGroupUsers);
    const dispatch = useDispatch();
    const { personalInfo: { nickName: myUserNickName, _id: myUserId } } = useSelector((state => state.myUser))
    console.log('users', users, 'workers', group.users )
    const initInputValues = {
        title: group.title,
        tags: group.tags.join(' '),
        description: group.description,
        restmen: users.filter((user) => !group.users.some(worker => worker.userId === user.userId)),
        workers: users.filter((user) => group.users.some(worker => worker.userId === user.userId && worker.userId !== myUserId)),
    } 

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputValues, setInputValues] = useState(initInputValues);
    // console.log('input', inputValues)
    const handleChange = (prop) => (event) => {
        setInputValues({ ...inputValues, [prop]: event.target.value });
    };
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    const moveUser = (id, fromArr, toArr) => {
        console.log('from', inputValues[fromArr].filter((user) => user.userId === id))
        setInputValues({
            ...inputValues,
            [toArr]: [...inputValues[toArr], ...inputValues[fromArr].filter((user) => user.userId === id)],
            [fromArr]: inputValues[fromArr].filter((user) => user.userId !== id)
        });
    }

    const sendRequest = () => {
        const { title, description } = inputValues;
        console.log('out', inputValues.workers)
        if (group && title) {
            const requestData = {
                data: { title, description, users: [...inputValues.workers, { userId: myUserId, role: 'test' }], tags: [...inputValues.tags.split(' ')] },
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
            <Card body className="card_custom edit-group-form purple-theme_back">
                <Input className="input-size" value={inputValues.title} onChange={handleChange('title')} name="title" placeholder='Group title...' />
                <InputGroup className="">
                    
                    <Input className="input-size" value={inputValues.tags} onChange={handleChange('tags')} name="tags" placeholder='tags...' />
                    <InputGroupButtonDropdown addonType="append" className='form__left-area' isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle caret className="form__left-area">Add workers</DropdownToggle>
                        <DropdownMenu>
                            {/* {console.log('rest', inputValues.restmen)} */}
                            {inputValues.restmen.length ? inputValues.restmen.map((user) => <DropdownItem onClick={() => moveUser(user.userId, 'restmen', 'workers')} key={user.userId} >{user.nickName}</DropdownItem>) :
                                <DropdownItem disabled>No more friends</DropdownItem>}
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
                <InputGroup className="">
                    <Input className="input-size textarea_heigth" type="textarea" value={inputValues.description} onChange={handleChange('description')} name="description" placeholder="Description..." />
                    <Paper elevation={0} className="form-control edit-group-form__friends-area list-with-del form__left-area">
                        <div ><span>{myUserNickName}</span> <hr /></div>
                        {/* {console.log('work', inputValues.workers)} */}
                        {inputValues.workers.map((worker) => <div key={worker.userId}><span>{worker.nickName}</span><div onClick={() => moveUser(worker.userId, 'workers', 'restmen')}><CloseIcon className="close-cross" fontSize="small" /></div></div>)}
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