import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './index.scss'
import ListItemCard from '../../helpers/ListItemCard';
import EditGroupForm from '../../EditGroupForm';



export default ({ currentGroup }) => {
    const history = useHistory();
    const { groups: groupsArr, editingGroupId, editingGroupUsers, hoveredGroupId } = useSelector(state => state.groups);
    console.log(hoveredGroupId)
    const group = hoveredGroupId ? groupsArr.find(group => group._id === hoveredGroupId) : currentGroup;
    const { users } = useSelector(state => state.users);

    const handleGroupClick = (event, id) => {
        if (event.target.type !== "button") {
            history.push(`/groups/${id}`);
        }
    }



    const renderGroup = () => {
        if (group._id === editingGroupId && editingGroupUsers.length) {
            return <EditGroupForm group={group} key={group._id} />
        } else {

            const activeTasksCounter = group.tasks.all ?
                `${group.tasks.active} of ${group.tasks.all}` :
                'empty';

            return (
                <ListItemCard id={group._id} type='group' className="group_card">
                    <div className="card__item_custom group__title">
                        <h5>{group.title}</h5>
                        <span className="card-item-article">group title</span>
                    </div>
                    <div className="card__item_custom group__description">
                        <p >{group.description}</p>
                        <span className="card-item-article">description</span>
                    </div>
                    <div className="group__tags card__item_custom">
                        {group.tags.map(tag => <div key={tag}>{tag}</div>)}
                        <span className="card-item-article">tags</span>
                    </div>

                    <div className="card__item_custom group__users">
                        {group.users.map((userId) => <div key={userId}>{users.find((user) => user._id === userId).nickName}</div>)}
                        <span className="card-item-article">users</span>
                    </div>

                </ListItemCard>
            )
        }
    }

    return (
        <div className='groups__active-group'>
            {group ? renderGroup() : <Card />}
        </div>
    )
}