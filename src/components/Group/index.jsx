import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { setHeaderTab } from '../../redux/actions/appActionCreator';
import './index.scss';
import '../../app.scss';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from 'react-router-dom';

export default props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputValues, setInputValues] = useState({

    })
    const { groups: groupsArr } = useSelector(state => state.groups);
    const { groupId } = props;
    const currentGroup = groupsArr.filter((group) => group.id == groupId)[0];

    const handleBackButton = () => {
        history.push('/groups');
    }
    const tasksRender = currentGroup.tasks.map((task) => {
        console.log(task)
        const workers = task.workers.split(', ').map((worker) => <div>{worker}</div>)
        return (
            <Card className="task-card" body key={task.id}>
                <CardTitle className="flex-space-between">
                    <div className="task-title card-item-div">
                        {task.title}
                        <span className="card-item-article">task title</span>
                    </div>

                    <div className="users card-item-div">
                        
                        <span>{workers}</span>
                        <span className="card-item-article">workers</span>
                    </div>
                </CardTitle>
                <div className="task-body flex-space-between">
                    <div className="body card-item-div">
                        {task.body}
                        <span className="card-item-article">description</span>
                    </div>
                </div>

            </Card>
        )
    })

    return (
        <div className="content-width">
            <div className="group-header flex-space-between">
                <h1>Group</h1>
                <h2>{currentGroup.title}</h2>
                <p>{currentGroup.description}</p>
                <Button onClick={handleBackButton} className="back-button"><KeyboardBackspaceIcon />Back</Button>
            </div>
            <div className="task-tags card-item-div">
                {currentGroup.tags.join(' ')}
                <span className="card-item-article">tags</span>
            </div>
            {tasksRender}
            <div className="active-tasks card-item-div">
                <span className="card-item-article">active tasks</span>
                {currentGroup.tasks.filter((task) => task.checked === false).length} of {currentGroup.tasks.length}
            </div>
        </div>
    )
}