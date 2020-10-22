import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGroupsReq, setEditingGroupId } from '../../redux/actions/groupActionCreator';
import './index.scss';
import '../../app.scss';

import CreatingForm from '../CreatingForm';
import { getUsersReq } from '../../redux/actions/usersActionCreator';
import { getFriendsReq } from '../../providers/friendsProvider';
import { Card } from '@material-ui/core';
import GroupsList from './GroupsList';

export default props => {
    const dispatch = useDispatch();

    const [myFriends, setMyFriends] = useState([]);
    const [slideUp, setSlideUp] = useState('');
    const [isShowForm, setIsShowForm] = useState(false);

    const getFriends = async () => {
        const response = await getFriendsReq();
        setMyFriends(response)
    }

    useEffect(() => {
        dispatch(setEditingGroupId())
        dispatch(getGroupsReq());
        getFriends();
        dispatch(getUsersReq());
    }, []);

    const startAnimation = () => {
        if (!slideUp) setSlideUp('slideUp');
        setIsShowForm(!isShowForm);
    }

    return (
        <div className={`groups-area slider-element content-width ${isShowForm ? 'slideDown' : slideUp}`}>
            {/* <div className="group-header flex-space-between">
                
            </div> */}
            <CreatingForm group slider={startAnimation} users={myFriends} />
            <Card className='items-list card__custom list-item-card purple-theme_back'>
            
                <div className='reverse'>
                    <span className='background__text'>Groups</span>
                    <GroupsList />
                </div>
            
            </Card>
        </div>
    )
}