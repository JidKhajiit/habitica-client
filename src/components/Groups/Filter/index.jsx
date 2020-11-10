import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
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
import { setFilterTagsForGroups, setFilterToggleForGroups, setFilterUsersForGroups } from '../../../redux/actions/groupActionCreator';
import TuneIcon from '@material-ui/icons/Tune';


export default ({ slide, slideUp, isShowForm }) => {
    const dispatch = useDispatch();
    // const { personalInfo: { nickName: myUserNickName } } = useSelector((state => state.myUser))
    const { filterUsersToggle, filterTagsToggle } = useSelector((state => state.groups));
    const toggles = { filterUsersToggle, filterTagsToggle }
    const { myFriends } = useSelector(state => state.users);
    const [inputValues, setInputValues] = useState({
        notTargetUsers: myFriends,
        targetUsers: [],
        usersSwitch: true,
        tags: '',
        targetTags: [],
        tagsSwitch: true
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const transformTags = () => {
        if (inputValues.tags) {
            const newTags = inputValues.tags.trim().split(/\s+/).map(tag => tag.search(/^#/) === -1 ? `#${tag}` : tag);
            const updatedTargetTags = [...new Set([...inputValues.targetTags, ...newTags])];
            setInputValues({ ...inputValues, targetTags: updatedTargetTags, tags: '' })
            dispatch(setFilterTagsForGroups(updatedTargetTags))
        }
    }

    const handleChangeTags = (event) => {
        if (event.target.value.trim() && event.target.value.search(/\s$/) + 1) {
            transformTags();
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

    const toggleSwitch = (target) => () => dispatch(setFilterToggleForGroups(target, !toggles[target]));

    const moveUser = (id, fromArr, toArr) => {
        const newTargetUsers = fromArr === 'targetUsers' ?
            inputValues[fromArr].filter((user) => user.userId !== id) :
            [...inputValues[toArr], ...inputValues[fromArr].filter((user) => user.userId === id)]
        setInputValues({
            ...inputValues,
            [toArr]: [...inputValues[toArr], ...inputValues[fromArr].filter((user) => user.userId === id)],
            [fromArr]: inputValues[fromArr].filter((user) => user.userId !== id)
        });
        const newTargetUsersIds = newTargetUsers.map(user => user.userId);
        dispatch(setFilterUsersForGroups(newTargetUsersIds));
    }

    useEffect(() => {
        setInputValues({ ...inputValues, notTargetUsers: myFriends })
    }, [myFriends]);

    return (
        <div className='groups__filter'>
            <Card body type='group' onClick={slide} className="filter__top-element card_custom purple-theme_back">
                <h5><TuneIcon /> Filters</h5>
            </Card>
            <Card body type='group' className={`card_custom filter__bottom-element filter__animate purple-theme_back slider-element ${isShowForm ? 'slideDown' : slideUp}`}>
                <InputGroup>
                    <Input className="input-size" value={inputValues.tags} onKeyUp={(event) => event.key === "Enter" && transformTags()} onChange={handleChangeTags} name="tags" placeholder='tags...' />
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle caret className="">Workers</DropdownToggle>
                        <DropdownMenu>
                            {/* {inputValues.workers.map((worker) => <div key={worker._id}><span>{users.find((item) => item._id === worker._id).nickName}</span><div onClick={() => moveUser(worker._id, 'workers', 'restmen')}><CloseIcon className="close-cross" fontSize="small" /></div></div>)} */}
                            {inputValues.notTargetUsers.length ?
                                inputValues.notTargetUsers.map(user => <DropdownItem onClick={() => moveUser(user.userId, 'notTargetUsers', 'targetUsers')} key={user.userId}> {user.nickName} </DropdownItem>) :
                                <DropdownItem disabled> No more friends </DropdownItem>}

                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
                <InputGroup className="">
                    <Paper elevation={0} className="form-control">
                        <div className="switch-container">
                            <span >{filterTagsToggle ? 'Include each' : 'Include at list one'}</span>
                            <div className="switch">
                                <input id="switch-1" type="checkbox" onChange={toggleSwitch('filterTagsToggle')} checked={filterTagsToggle} className="switch-input" />
                                <label htmlFor="switch-1" className="switch-label">Include each</label>
                            </div>
                            <hr />
                        </div>
                        <div>
                            {inputValues.targetTags.map((tag) => <div key={tag}><span>{tag}</span><div className='close-cross-div' onClick={() => handleDelTag(tag)}><CloseIcon className="close-cross" fontSize="small" /></div></div>)}
                        </div>
                    </Paper>
                    <Paper elevation={0} className="form-control">
                        <div className="switch-container">
                            <span >{filterUsersToggle ? 'Include each' : 'Include at list one'}</span>
                            <div className="switch">
                                <input id="switch-2" type="checkbox" onChange={toggleSwitch('filterUsersToggle')} checked={filterUsersToggle} className="switch-input" />
                                <label htmlFor="switch-2" className="switch-label">Include each</label>
                            </div>
                            <hr />
                        </div>
                        <div>
                            {/* <div ><span>{myUserNickName}</span> <hr /></div> */}
                            {inputValues.targetUsers.map((worker) => <div key={worker.userId}><span>{worker.nickName}</span><div className='close-cross-div' onClick={() => moveUser(worker.userId, 'targetUsers', 'notTargetUsers')}><CloseIcon className="close-cross" fontSize="small" /></div></div>)}
                        </div>

                    </Paper>
                </InputGroup>
            </Card>
        </div>
    )
}