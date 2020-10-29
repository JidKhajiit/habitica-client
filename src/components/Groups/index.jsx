import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataForGroups, getGroupsReq, setEditingGroupId, setFilterTagsForGroups, setFilterUsersForGroups } from '../../redux/actions/groupActionCreator';
import './index.scss';
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
    const [creatingFormSlideUp, setCreatingFormSlideUp] = useState('');
    const [isShowCreatingForm, setIsShowCreatingForm] = useState(false);
    const [filterFormSlideUp, setFilterFormSlideUp] = useState('');
    const [isShowFilterForm, setIsShowFilterForm] = useState(false);

    const filteredGroupsArr = groupsArr ? groupsArr
        .filter(group => group.title.includes(searchText))
        .filter(group => group.users.hasAllBesides(filterUsers))
        .filter(group => group.tags.hasAllBesides(filterTags)) :
        null

    useEffect(() => {
        dispatch(setFilterTagsForGroups([]))
        dispatch(setFilterUsersForGroups([]))
        dispatch(setEditingGroupId())
        dispatch(getDataForGroups());
    }, []);

    const startCreatingFormAnimation = () => {
        if (!creatingFormSlideUp) setCreatingFormSlideUp('slideUp');
        setIsShowCreatingForm(!isShowCreatingForm);
    }

    const startFilterFormAnimation = () => {
        if (!filterFormSlideUp) setFilterFormSlideUp('slideUp');
        setIsShowFilterForm(!isShowFilterForm);
    }

    return (
        <div className='groups__elements_flex'>
            <div className='invisible-wall'></div>
            <div>
                <Search />
                <div className={`groups-area slider-element ${isShowCreatingForm ? 'slideDown' : creatingFormSlideUp}`}>
                    <CreatingForm group slide={startCreatingFormAnimation} users={myFriends} />
                    <Card className='items-list card_custom list-item-card purple-theme_back'>

                        <div className='reverse'>
                            <span className='background__text'>Groups</span>
                            <GroupsList groupsArr={filteredGroupsArr} />
                        </div>

                    </Card>
                </div>
            </div>

            <div className='groups__details'>
                <div className='groups__filter'>
                    <Filter slide={startFilterFormAnimation} slideUp={filterFormSlideUp} isShowForm={isShowFilterForm} />
                </div>
                <div className={`groups__group-info-area filter__animate slider-element ${isShowFilterForm ? 'slideDown' : filterFormSlideUp}`}>
                    <GroupInfo currentGroup={groupsArr ? filteredGroupsArr[filteredGroupsArr.length - 1] : null} /> {/* изменить условие */}
                </div>
            </div>
        </div>

    )
}