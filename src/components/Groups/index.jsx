import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, CardTitle } from 'reactstrap';
import { setHeaderTab } from '../../redux/actions/appActionCreator';
import { getGroupsReq } from '../../redux/actions/groupActionCreator';
import './index.scss';
import '../../app.scss';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import CreatingForm from '../CreatingForm';
import { getUsersReq } from '../../redux/actions/usersActionCreator';

export default props => {
    const dispatch = useDispatch();
    const { groups: groupsArr } = useSelector(state => state.groups);
    const history = useHistory();
    const [someValue, setSomeValue] = useState(false)

    const handleGroupClick = (id) => {
        history.push(`/groups/${id}`);
    }

    useEffect(() => {
        dispatch(setHeaderTab('/groups'));
        dispatch(getGroupsReq());
        dispatch(getUsersReq())
    }, []);

    const groupsRender = groupsArr.map((group) => {
        const activeTasksCounter = group.tasks.all ?
            `${group.tasks.all} of ${group.tasks.active}` :
            'no tasks yet';

        return (
            <Card className="groups-card card__custom" body _id={group._id} key={group._id} onClick={() => handleGroupClick(group._id)}>
                <CardTitle className="flex-space-between">
                    <div className="group-title card_item__custom">
                        {group.title}
                        <span className="card-item-article">group title</span>
                    </div>
                    <div className="group-tags card_item__custom">
                        {group.tags.join(' ')}
                        <span className="card-item-article">tags</span>
                    </div>
                    <div className="users card_item__custom">
                        <AccessibleForwardIcon />
                        <span>{group.users.length}</span>
                        <span className="card-item-article">users</span>
                    </div>
                </CardTitle>
                <div className="group-description flex-space-between">
                    <div className="description card_item__custom">
                        {group.description}
                        <span className="card-item-article">description</span>
                    </div>
                    <div className="active-tasks card_item__custom">
                        <span className="card-item-article">active tasks</span>
                        {activeTasksCounter}
                    </div>

                </div>

            </Card>
        )
    })

    return (
        <div className="content-width">
            <div className="group-header flex-space-between">
                <h1>Groups</h1>
                <Button className="add-button"><AddIcon />New Group</Button>
            </div>
            <CreatingForm group />
            <div style={{display: "flex", flexDirection: "column-reverse"}}>
                {groupsRender}
            </div>
            
        </div>
    )
}