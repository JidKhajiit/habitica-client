import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { setHeaderTab } from '../../redux/actions/appActionCreator';
import './index.scss';
import '../../app.scss';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

export default props => {
    const dispatch = useDispatch();
    const [inputValues, setInputValues] = useState({

    })
    const { groups: groupsArr } = useSelector(state => state.groups);
    const history = useHistory();
    console.log(groupsArr);

    const handleGroupClick = (event) => {
        console.log(event.target.id);
        history.push(`/groups/${event.target.id}`);
    }

    useEffect(() => {
        dispatch(setHeaderTab('/groups'));
    }, []);

    const groupsRender = groupsArr.map((group) => {


        return (
            <Card className="groups-card" body id={group.id} key={group.id} onClick={handleGroupClick}>
                <CardTitle className="flex-space-between">
                    <div className="group-title card-item-div">
                        {group.title}
                        <span className="card-item-article">group title</span>
                    </div>
                    <div className="group-tags card-item-div">
                        {group.tags.join(' ')}
                        <span className="card-item-article">tags</span>
                    </div>
                    <div className="users card-item-div">
                        <AccessibleForwardIcon />
                        <span>{group.users.length}</span>
                        <span className="card-item-article">users</span>
                    </div>
                </CardTitle>
                <div className="group-description flex-space-between">
                    <div className="description card-item-div">
                        {group.description}
                        <span className="card-item-article">description</span>
                    </div>
                    <div className="active-tasks card-item-div">
                        <span className="card-item-article">active tasks</span>
                        {group.tasks.filter((task) => task.checked === false).length} of {group.tasks.length}
                    </div>

                </div>

            </Card>
        )
    })

    return (
        <div className="content-width">
            <div className="group-header flex-space-between">
                <h1>Groups</h1>
                <Button className="add-group-button"><AddIcon/>New Group</Button>
            </div>
            {groupsRender}
        </div>
    )
}