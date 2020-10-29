import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataForGroups, getGroupsReq, setEditingGroupId, setFilterTagsForGroups, setFilterUsersForGroups } from '../../redux/actions/groupActionCreator';
import './index.scss';
import '../../app.scss';
import Filter from './Filter'
import CreatingForm from '../CreatingForm';
import { Card } from '@material-ui/core';
import GroupsList from './GroupsList';
import GroupInfo from './GroupInfo';
import Search from './Search';

Array.prototype.hasAllBesides = function (a) {
    if (a && a.length) return a.every((item) => this.includes(item));
    else return true
};

export default props => {
    const dispatch = useDispatch();

    const { groups: groupsArr, editingGroupId, searchText, filterUsers, filterTags } = useSelector(state => state.groups);
    const { myFriends } = useSelector(state => state.users);
    const currentGroup = editingGroupId ? groupsArr.find((group) => group._id === editingGroupId) : {};
    const [slideUp, setSlideUp] = useState('');
    const [isShowForm, setIsShowForm] = useState(false);
    const filteredGroupsArr = groupsArr
        .filter(group => group.title.includes(searchText))
        .filter(group => group.users.hasAllBesides(filterUsers))
        .filter(group => group.tags.hasAllBesides(filterTags))

    useEffect(() => {
        dispatch(setFilterTagsForGroups([]))
        dispatch(setFilterUsersForGroups([]))
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
                <div>
                    <div className='invisible-wall'></div>
                    <Search />
                    <div className={`groups-area slider-element ${isShowForm ? 'slideDown' : slideUp}`}>
                        <CreatingForm group slider={startAnimation} users={myFriends} />
                        <Card className='items-list card__custom list-item-card purple-theme_back'>

                            <div className='reverse'>
                                <span className='background__text'>Groups</span>
                                <GroupsList groupsArr={filteredGroupsArr} />
                            </div>

                        </Card>
                    </div>
                </div>

                <div className='groups__details'>
                    <div className='groups__filter'>
                        <Filter />
                    </div>
                    <div className='groups__group-info-area'>
                        <GroupInfo currentGroup={filteredGroupsArr[filteredGroupsArr.length - 1]} /> {/* изменить условие */}
                    </div>
                </div>
            </div>
        </div>
    )
}