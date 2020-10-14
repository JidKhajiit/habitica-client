import React from 'react'
import { useDispatch } from 'react-redux';
import { CardTitle, Card, Button } from 'reactstrap';
import './index.scss'
import '../../../app.scss'
import { createFriendReq } from '../../../providers/friendsProvider';

export default ({ user, type }) => {
    const dispatch = useDispatch();


    const handleCardClick = (task) => {

    }

    const handleEditButton = (event, id) => {
        if (event.target.type !== "button") {
            // dispatch(getFriendsReq())
        }
    }

    const handleDeleteButton = (event, id) => {
        if (event.target.type !== "button") {
            // dispatch(getFriendsReq())
        }
    }

    const handleAddButton = () => {
        // if (event.target.type !== "button") {
            createFriendReq(user._id)
        // }
    }

    return (
        <Card body className="card__custom list-item-card" id={user._id} key={user._id} onClick={(event) => handleCardClick(event, user._id)}>
            <CardTitle className="flex-space-between">
                <div className="group-title card_item__custom">
                    {user.nickName}
                    <span className="card-item-article">nickname</span>
                </div>
                {type === "friend" && <>
                    <Button size="sm" color="success" className="edit-button" onClick={handleEditButton}>Message</Button>
                    <Button size="sm" color="danger" className="delete-button" onClick={handleDeleteButton}>Delete</Button>
                </>}
                {type === 'add' && <>
                    <Button size="sm" color="success" disabled={user.status === 'req is exists'} onClick={handleAddButton}>Add</Button>
                </>}

            </CardTitle>

        </Card>
    )
}