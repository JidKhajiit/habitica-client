import React from 'react'
import { useDispatch } from 'react-redux';
import { CardTitle, Card, Button } from 'reactstrap';
import './index.scss'
import '../../../app.scss'
import { createReqOfFrendshipReq, deleteReqOfFriendshipReq, acceptFriendshipReq } from '../../../providers/friendsProvider';
import { setFriendTab } from '../../../redux/actions/appActionCreator';

export default ({ user, type, rerender }) => {
    const dispatch = useDispatch();
    console.log(type)

    const handleCardClick = (task) => {
        if (user.status === 'outgoing req is exists') {
            dispatch(setFriendTab('outgoing-reqs'));
        }
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

    const handleAddButton = async () => {
        // if (event.target.type !== "button") {
        await createReqOfFrendshipReq(user._id)
        rerender()
        // }
    }

    const handleCancelReqButton = async () => {
        try {
            await deleteReqOfFriendshipReq(user._id)
            rerender()
        } catch (err) {
            console.log(err)
        }

    }

    const handleAcceptReqButton = async () => {
        try {
            await acceptFriendshipReq(user._id)
            rerender()
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Card body className="card__custom list-item-card" id={user._id} key={user._id} onClick={handleCardClick}>
            <CardTitle className="flex-space-between">
                <div className="group-title card_item__custom">
                    {user.nickName}
                    <span className="card-item-article">nickname</span>
                </div>
                {type === "friend" && <>
                    <Button size="sm" color="success" className="edit-button" onClick={handleEditButton}>Message</Button>
                    <Button size="sm" color="danger" className="delete-button" onClick={handleDeleteButton}>Delete</Button>
                </>}
                {type === 'add' && user.status !== 'incoming req is exists' && <>
                    <Button size="sm" color="success" disabled={user.status === 'outgoing req is exists'} onClick={handleAddButton}>Add</Button>
                </>}
                {type === 'outgoing-req' && <>
                    <Button size="sm" color="danger" onClick={handleCancelReqButton}>Cancel</Button>
                </>}
                {type === 'incoming-req' && <>
                    <Button size="sm" color="danger" onClick={handleCancelReqButton}>Cancel</Button>
                </>}
                {(type === 'incoming-req' || user.status === 'incoming req is exists') && <>
                    <Button size="sm" color="success" onClick={handleAcceptReqButton}>Accept</Button>
                </>}

            </CardTitle>

        </Card>
    )
}