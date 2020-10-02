import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, CardTitle } from 'reactstrap';
import { setHeaderTab } from '../../redux/actions/appActionCreator';
import './index.scss';
import '../../app.scss';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from 'react-router-dom';
import CreatingForm from '../CreatingForm';

export default props => {
    const dispatch = useDispatch();
    const history = useHistory();

    // const [inputValues, setInputValues] = useState({
    //     title: '',
    //     description: '',
    //     firstName: '',
    //     lastName: ''
    // });
    const { groups: groupsArr } = useSelector(state => state.groups);
    const { groupId } = props;
    const currentGroup = groupsArr.filter((group) => group._id === groupId)[0];

    const handleBackButton = () => {
        history.push('/groups');
    }

    useEffect(() => {
        dispatch(setHeaderTab(`/groups`));
    }, []);

    // const handleChange = (prop) => (event) => {
    //     setInputValues({ ...inputValues, [prop]: event.target.value });
    //   };



    const tasksRender = currentGroup.tasks.map((task) => {
        const workers = task.workers.map((worker) => <div key={worker._id}>{worker.nickName}</div>)
        return (
            <Card className="task-card card__custom flex-space-between" body key={task._id}>

                <div className="left-item">
                    <CardTitle className="flex-space-between">
                        <div className="task-title card_item__custom">
                            {task.title}
                            <span className="card-item-article">task title</span>
                        </div>
                    </CardTitle>
                    <div className="task-body flex-space-between">
                        <div className="body card_item__custom">
                            {task.body}
                            <span className="card-item-article">description</span>
                        </div>
                    </div>
                </div>
                <div className="right-item users card_item__custom">
                    <span>{workers}</span>
                    <span className="card-item-article">workers</span>
                </div>
            </Card>
        )
    })

    return (
        <div className="content-width">
            <div className="group-header flex-space-between">
                <h1>Group</h1>
                <Button onClick={handleBackButton} className="back-button"><KeyboardBackspaceIcon />Back</Button>
            </div>
            <Card body className="card__custom group_card">
                <div className="card_item__custom">
                    <h5>{currentGroup.title}</h5>
                    <span className="card-item-article">group title</span>
                </div>
                <div className="flex-space-between">
                    <div className="left-item">
                        <div className="card_item__custom">
                            <p >{currentGroup.description}</p>
                            <span className="card-item-article">description</span>
                        </div>
                        <div className="task-tags card_item__custom">
                            {currentGroup.tags.join(' ')}
                            <span className="card-item-article">tags</span>
                        </div>
                    </div>
                    <div className="right-item card_item__custom">
                        {currentGroup.users.map((user, index) => <div key={user._id}>{user.nickName}</div>)}
                        <span className="card-item-article">users</span>
                    </div>
                </div>
            </Card>

            <CreatingForm task groupId={groupId} users={currentGroup.users} />

            {tasksRender}
            <div className="active-tasks card_item__custom">
                <span className="card-item-article">active tasks</span>
                {currentGroup.tasks.filter((task) => task.checked === false).length} of {currentGroup.tasks.length}
            </div>
        </div>
    )
}