import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardTitle } from 'reactstrap';
import '../../../app.scss';
import { useHistory } from 'react-router-dom';


export default ({className}) => {
    const dispatch = useDispatch();
    let { users } = useSelector(state => state.users);
    const { personalInfo: { nickName: myUserNickName } } = useSelector((state => state.myUser))
    const history = useHistory();

    users = users.filter((user) => user.nickName !== myUserNickName)

    const handleGroupClick = (event, id) => {
        if (event.target.type !== "button") {
            // history.push(`/users/${id}`);
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

    useEffect(() => {
        // dispatch(getFriendsReq())
    }, []);

    const friendsRender = users.map((user) => {

        return (
            <Card body className="card__custom list-item-card" id={user._id} key={user._id} onClick={(event) => handleGroupClick(event, user._id)}>
                <CardTitle className="flex-space-between">
                    <div className="group-title card_item__custom">
                        {user.nickName}
                        <span className="card-item-article">nickname</span>
                    </div>
                    <Button size="sm" color="success" className="edit-button" onClick={handleEditButton}>Send Message</Button>
                    <Button size="sm" color="danger" className="delete-button" onClick={handleDeleteButton}>Delete</Button>
                </CardTitle>

            </Card>
        )
    })

    return (
            <div style={{ display: "flex", flexDirection: "column-reverse" }} className={className}>
                {friendsRender}
            </div>
    )
}