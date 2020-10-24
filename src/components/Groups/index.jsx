import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataForGroups, getGroupsReq, setEditingGroupId } from '../../redux/actions/groupActionCreator';
import './index.scss';
import '../../app.scss';

import CreatingForm from '../CreatingForm';
import { getUsersReq } from '../../redux/actions/usersActionCreator';
import { getFriendsReq } from '../../providers/friendsProvider';
import { Card } from '@material-ui/core';
import GroupsList from './GroupsList';
import GroupInfo from './GroupInfo';

export default props => {
    const dispatch = useDispatch();

    const { groups: groupsArr, editingGroupId, editingGroupUsers } = useSelector(state => state.groups);
    const { myFriends } = useSelector(state => state.users);
    const currentGroup = editingGroupId ? groupsArr.find((group) => group._id === editingGroupId) : {};
    const [slideUp, setSlideUp] = useState('');
    const [isShowForm, setIsShowForm] = useState(false);

    useEffect(() => {
        
        dispatch(setEditingGroupId())
        dispatch(getDataForGroups());
    }, []);

    const startAnimation = () => {
        if (!slideUp) setSlideUp('slideUp');
        setIsShowForm(!isShowForm);
    }

    return (
        <div>
            <div className='groups__elements_flex'>
                <div className={`groups-area slider-element ${isShowForm ? 'slideDown' : slideUp}`}>
                    <CreatingForm group slider={startAnimation} users={myFriends} />
                    <Card className='items-list card__custom list-item-card purple-theme_back'>

                        <div className='reverse'>
                            <span className='background__text'>Groups</span>
                            <GroupsList />
                        </div>

                    </Card>
                </div>
                <div className='groups__group-info-area'>{<GroupInfo currentGroup={groupsArr[groupsArr.length - 1]}/>}</div>
            </div>
            
        </div>
    )
}