import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardTitle } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

import ListItemCard from '../../helpers/ListItemCard';
import EditForm from '../../EditTaskForm';
import { setHoveredGroup } from '../../../redux/actions/groupActionCreator';


export default props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { groups: groupsArr, editingGroupId, editingGroupUsers } = useSelector(state => state.groups);

    const handleGroupClick = (event, id) => {
        if (event.target.type !== "button") {
            history.push(`/groups/${id}`);
        }
    }

    const handleGroupHover = (id) => {
        if(!editingGroupId) dispatch(setHoveredGroup(id));
    }

    const renderGroups = groupsArr.map((group) => {
        // if (group._id === editingGroupId && editingGroupUsers.length) {
        //     return <EditForm group={group} key={group._id} />
        // } else {

            const activeTasksCounter = group.tasks.all ?
                `${group.tasks.active} of ${group.tasks.all}` :
                'empty';

            return (
                <Card body className='groups-card hover_recolor card__custom list-item-card purple-theme_back' id={group._id} onClick={(event) => handleGroupClick(event, group._id)} onMouseEnter={() => handleGroupHover(group._id)} key={group._id} type="group" >  
                    <CardTitle className="flex-space-between">
                        <div className="group-title card_item__custom">
                            {group.title}
                            <span className="card-item-article">group title</span>
                        </div>
                        {/* <div className="group-tags card_item__custom">
                            {group.tags.join(' ')}
                            <span className="card-item-article">tags</span>
                        </div> */}
                        <div className="users card_item__custom">
                            <AccessibleForwardIcon />
                            <span>{group.users.length}</span>
                            <span className="card-item-article">members</span>
                        </div>
                        <div className="active-tasks card_item__custom">
                            <span className="card-item-article">activities</span>
                            {activeTasksCounter}
                        </div>
                    </CardTitle>
                    {/* <div className="group-description flex-space-between">
                        <div className="description card_item__custom">
                            {group.description}
                            <span className="card-item-article">description</span>
                        </div>


                    </div> */}

                </Card>
            )
        // }
    })

    return (
        < >
            {renderGroups}
        </>
    )
}