import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.scss'
import {
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    InputGroup,
    Input
} from 'reactstrap';
import { useEffect } from 'react';
import { setFilterTagsForGroups, setFilterUsersForGroups } from '../../../redux/actions/groupActionCreator';
import { ContactSupportOutlined } from '@material-ui/icons';


export default ({ currentGroup }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { groups: groupsArr, hoveredGroupId } = useSelector(state => state.groups);
    const { personalInfo: { nickName: myUserNickName, _id: myUserId } } = useSelector((state => state.myUser))
    const { myFriends } = useSelector(state => state.users);
    const [inputValues, setInputValues] = useState({
        notTargetUsers: myFriends,
        targetUsers: [],
        tags: '',
        targetTags: []
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleChangeItem = (prop) => (event) => {
        setInputValues({ ...inputValues, [prop]: event.target.value });
    };

    const handleChangeTags = (event) => {
        if (event.target.value.trim() && event.target.value.search(/\s$/) + 1) {
            const newTags = inputValues.tags.trim().split(/\s+/).map(tag => tag.search(/^#/) === -1 ? `#${tag}` : tag );
            const updatedTargetTags = [...new Set([...inputValues.targetTags, ...newTags])];
            setInputValues({ ...inputValues, targetTags: updatedTargetTags, tags: '' })
            dispatch(setFilterTagsForGroups(updatedTargetTags))
        } else {
            setInputValues({ ...inputValues, tags: event.target.value });
        }
    }

    const handleDelTag = (deletedTag) => {
        const updatedTargetTags = inputValues.targetTags.filter(tag => tag !== deletedTag)
        setInputValues({ ...inputValues, targetTags: updatedTargetTags });
        dispatch(setFilterTagsForGroups(updatedTargetTags))
    }

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    const moveUser = (id, fromArr, toArr) => {
        const newTargetUsers = fromArr === 'targetUsers' ?
            inputValues[fromArr].filter((user) => user._id !== id) :
            [...inputValues[toArr], ...inputValues[fromArr].filter((user) => user._id === id)]
        setInputValues({
            ...inputValues,
            [toArr]: [...inputValues[toArr], ...inputValues[fromArr].filter((user) => user._id === id)],
            [fromArr]: inputValues[fromArr].filter((user) => user._id !== id)
        });
        const newTargetUsersIds = newTargetUsers.map(user => user._id);
        dispatch(setFilterUsersForGroups(newTargetUsersIds));
    }

    useEffect(() => {
        setInputValues({ ...inputValues, notTargetUsers: myFriends })
    }, [myFriends]);

    return (
        <Card body type='group' className="card__custom groups__filter purple-theme_back">
            {/* <Input className="input-size" value={inputValues.title} onChange={handleChangeItem('title')} name="title" placeholder='Group title...' /> */}
            <InputGroup className="">

                <Input className="input-size" value={inputValues.tags} onChange={handleChangeTags} name="tags" placeholder='tags...' />
                <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                    <DropdownToggle caret className="">Workers</DropdownToggle>
                    <DropdownMenu>
                        {/* {inputValues.workers.map((worker) => <div key={worker._id}><span>{users.find((item) => item._id === worker._id).nickName}</span><div onClick={() => moveUser(worker._id, 'workers', 'restmen')}><CloseIcon className="close-cross" fontSize="small" /></div></div>)} */}
                        {inputValues.notTargetUsers.length ?
                            inputValues.notTargetUsers.map(user => <DropdownItem onClick={() => moveUser(user._id, 'notTargetUsers', 'targetUsers')} key={user._id}> {user.nickName} </DropdownItem>) :
                            <DropdownItem disabled> No more friends </DropdownItem>}

                    </DropdownMenu>
                </InputGroupButtonDropdown>
            </InputGroup>
            <InputGroup className="">
                <Paper elevation={0} className="form-control">
                    {inputValues.targetTags.map((tag) => <div key={tag}><span>{tag}</span><div className='close-cross-div' onClick={() => handleDelTag(tag)}><CloseIcon className="close-cross" fontSize="small" /></div></div>)}
                </Paper>
                <Paper elevation={0} className="form-control">
                    <div ><span>{myUserNickName}</span> <hr /></div>
                    {inputValues.targetUsers.map((worker) => <div key={worker._id}><span>{worker.nickName}</span><div className='close-cross-div' onClick={() => moveUser(worker._id, 'targetUsers', 'notTargetUsers')}><CloseIcon className="close-cross" fontSize="small" /></div></div>)}
                </Paper>
            </InputGroup>

        </Card>
    )
}