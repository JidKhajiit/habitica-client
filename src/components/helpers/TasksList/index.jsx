import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CardTitle, InputGroupAddon, InputGroupText } from 'reactstrap';
import { checkTask } from '../../../redux/actions/tasksActionCreator';
import ListItemCard from '../ListItemCard';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditTaskForm from '../../EditTaskForm';
import '../../../app.scss'

export default ({ tasks, users }) => {
    const dispatch = useDispatch();
    const { editingTaskId } = useSelector((state) => state.tasks)

    const handleCheckBox = (task) => {
        dispatch(checkTask(task))
    }

    const tasksRender = tasks && tasks.length ? tasks.map((task) => {
        console.log(task)
        if (task._id === editingTaskId) {
            return <EditTaskForm users={users} task={task} key={task._id} />
        } else {
            const workers = task.workers.map((worker) => <div key={worker.userId}>{users.find((user) => user.userId === worker.userId).nickName}</div>)
            return (
                <ListItemCard
                    className="task-card flex-space-between list-item-card hover_recolor "
                    completed={task.completed}
                    groupId={task.groupId}
                    type="task"
                    id={task._id}
                    key={task._id}
                >
                    <InputGroupAddon onClick={() => handleCheckBox(task)} addonType="prepend">
                        <InputGroupText>
                            {task.completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="left-item">
                        <CardTitle className="flex-space-between">
                            <div className="task-title card__item_custom">
                                {task.title}
                                <span className="card-item-article">task title</span>
                            </div>
                        </CardTitle>
                        <div className="task-body flex-space-between">
                            <div className="body card__item_custom">
                                {task.description}
                                <span className="card-item-article">description</span>
                            </div>
                        </div>
                    </div>
                    <div className="right-item users card__item_custom">
                        <span>{workers}</span>
                        <span className="card-item-article">workers</span>
                    </div>
                </ListItemCard>
            )
        }
    }) : null


    return <>{tasksRender}</>
}