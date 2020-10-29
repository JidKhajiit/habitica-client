import React from 'react'
import { useDispatch } from 'react-redux';
import { CardTitle, Card, Button } from 'reactstrap';
import './index.scss'
import { createBidForFrendshipReq, deleteBidForFriendshipReq, acceptFriendshipReq, deleteFriendReq } from '../../../providers/friendsProvider';
import { setFriendTab } from '../../../redux/actions/appActionCreator';

export default ({ user, type, rerender }) => {
    const dispatch = useDispatch();
    console.log(type)

    const handleCardClick = () => {
        if (user.status === 'outgoing req is exists') {
            dispatch(setFriendTab('outgoing-reqs'));
        }
    }

    const handleEditButton = (event, id) => {
        //chat
    }

    const handleDeleteFriendButton = async () => {
        await deleteFriendReq(user._id);
        rerender()
    }

    const handleAddFriendButton = async () => {
        await createBidForFrendshipReq(user._id)
        rerender()
    }

    const handleCancelBidButton = async () => {
        try {
            await deleteBidForFriendshipReq(user._id)
            rerender()
        } catch (err) {
            console.log(err)
        }
    }

    const handleAcceptBidButton = async () => {
        try {
            await acceptFriendshipReq(user._id)
            rerender()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Card body className="card_custom list-item-card user-card hover_recolor purple-theme_back" id={user._id} key={user._id} onClick={handleCardClick}>
            <CardTitle className="flex-space-between">
                <div className="group-title card__item_custom">
                    {user.nickName}
                    <span className="card-item-article">nickname</span>
                </div>
                {type === "friend" && <>
                    <Button size="sm" color="success" className="edit-button" disabled onClick={handleEditButton}>Message</Button>
                    <Button size="sm" color="danger" className="delete-button" onClick={handleDeleteFriendButton}>Delete</Button>
                </>}
                {type === 'add' && user.status !== 'incoming req is exists' && <>
                    <Button size="sm" color="success" disabled={user.status === 'outgoing req is exists'} onClick={handleAddFriendButton}>Add</Button>
                </>}
                {type === 'outgoing-req' && <>
                    <Button size="sm" color="danger" onClick={handleCancelBidButton}>Cancel</Button>
                </>}
                {type === 'incoming-req' && <>
                    <Button size="sm" color="danger" onClick={handleCancelBidButton}>Cancel</Button>
                </>}
                {(type === 'incoming-req' || user.status === 'incoming req is exists') && <>
                    <Button size="sm" color="success" onClick={handleAcceptBidButton}>Accept</Button>
                </>}

            </CardTitle>

        </Card>
    )
}