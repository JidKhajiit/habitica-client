import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardTitle } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import { setHoveredGroup } from '../../../redux/actions/groupActionCreator';
import { MySpinner } from '../../smallComponents/Spinner';

export default ({groupsArr}) => {


    const history = useHistory();
    const dispatch = useDispatch();
    const { groups: editingGroupId } = useSelector(state => state.groups);

    const handleGroupClick = (event, id) => {
        if (event.target.type !== "button") {
            history.push(`/groups/${id}`);
        }
    }

    const handleGroupHover = (id) => {
        if (!editingGroupId) dispatch(setHoveredGroup(id));
    }

    const renderGroups = groupsArr && groupsArr.map((group) => {
        const activeTasksCounter = group.tasks.all ?
            `${group.tasks.active} of ${group.tasks.all}` :
            'empty';
        return (
            <Card body
                className='groups-card hover_recolor card_custom list-item-card purple-theme_back'
                id={group._id}
                onClick={(event) => handleGroupClick(event, group._id)}
                onMouseEnter={() => handleGroupHover(group._id)}
                key={group._id}
                type="group"
            >
                <CardTitle className="flex-space-between">
                    <div className="group-title card__item_custom">
                        {group.title}
                        <span className="card-item-article">group title</span>
                    </div>
                    {/* <div className="group-tags card__item_custom">
                            {group.tags.join(' ')}
                            <span className="card-item-article">tags</span>
                        </div> */}
                    <div className="users card__item_custom">
                        <AccessibleForwardIcon />
                        <span>{group.users.length}</span>
                        <span className="card-item-article">members</span>
                    </div>
                    <div className="active-tasks card__item_custom">
                        <span className="card-item-article">activities</span>
                        {activeTasksCounter}
                    </div>
                </CardTitle>
            </Card>
        )
    })

    return (
        groupsArr ? < >
            {renderGroups}
        </> : <MySpinner fullSize />
    )
}