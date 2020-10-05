import React from 'react'
import { Card, CardTitle, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

export default ({ tasks, users }) => {
    const handleCheckBox = (taskId) => {
        
    }

    const tasksRender = tasks && tasks.length ? tasks.map((task) => {
        const workers = task.workers.map((worker) => <div key={worker._id}>{users.find((user) => user._id == worker._id).nickName}</div>)
        return (
            <Card className="task-card card__custom flex-space-between" body key={task._id}>
                <InputGroupAddon onClick={()=>handleCheckBox(task._id)} addonType="prepend">
                    <InputGroupText>
                        <Input addon checked={task.completed} onChange={(event) => event.preventDefault} type="checkbox" aria-label="Checkbox for following text input" />
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
            </Card>
        )
    }) : null


    return <div style={{ display: "flex", flexDirection: "column-reverse" }}>{tasksRender}</div>
}