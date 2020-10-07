import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardTitle, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { checkTask } from '../../redux/actions/tasksActionCreator';
import ListItemCard from '../helpers/ListItemCard';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditForm from '../EditForm';
import '../../app.scss'

export default ({ tasks, users }) => {
    const dispatch = useDispatch();
    const { editingTaskId } = useSelector((state) => state.tasks)

    const handleCheckBox = (task) => {
        dispatch(checkTask(task))
    }

    const tasksRender = tasks && tasks.length ? tasks.map((task) => {
        if (task._id === editingTaskId) {
            return <EditForm  users={users} task={task} key={task._id}/>
        } else {
            const workers = task.workers.map((worker) => <div key={worker._id}>{users.find((user) => user._id == worker._id).nickName}</div>)
            return (
                <ListItemCard className="task-card flex-space-between" completed={task.completed} groupId={task.groupId} type="task" id={task._id} key={task._id}>
                    <InputGroupAddon onClick={() => handleCheckBox(task)} addonType="prepend">
                        <InputGroupText>
                            {task.completed ? <CheckCircleIcon/> : <CheckCircleOutlineIcon/>}
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="left-item">
                        <CardTitle className="flex-space-between">
                            <div className="task-title card_item__custom">
                                {task.title}
                                <span className="card-item-article">task title</span>
                            </div>
                        </CardTitle>
                        <div className="task-body flex-space-between">
                            <div className="body card_item__custom">
                                {task.description}
                                <span className="card-item-article">description</span>
                            </div>
                        </div>
                    </div>
                    <div className="right-item users card_item__custom">
                        <span>{workers}</span>
                        <span className="card-item-article">workers</span>
                    </div>
                </ListItemCard>
            )
        }
    }) : null


    return <div style={{ display: "flex", flexDirection: "column-reverse" }}>{tasksRender}</div>
}