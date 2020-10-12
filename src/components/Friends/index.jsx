import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardTitle } from 'reactstrap';

import { getGroupsReq } from '../../redux/actions/groupActionCreator';
import './index.scss';
import '../../app.scss';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import { useHistory } from 'react-router-dom';
import CreatingForm from '../helpers/CreatingForm';
import { getUsersReq } from '../../redux/actions/usersActionCreator';
import ListItemCard from '../helpers/ListItemCard';

export default props => {
    const dispatch = useDispatch();
    let { users } = useSelector(state => state.users);
    const { personalInfo: { nickName: myUserNickName } } = useSelector((state => state.myUser))
    const history = useHistory();

    users = users.filter((user) => user.nickName !== myUserNickName)

    const handleGroupClick = (event, id) => {
        if (event.target.type !== "button") {
            history.push(`/groups/${id}`);
        }
    }

    useEffect(() => {
        dispatch(getGroupsReq());
        dispatch(getUsersReq())
    }, []);

    const friendsRender = users.map((user) => {

        return (
            <Card body className="card__custom list-item-card" id={user._id} key={user._id} onClick={(event) => handleGroupClick(event, user._id)}>
                <CardTitle className="flex-space-between">
                    <div className="group-title card_item__custom">
                        {user.nickName}
                        <span className="card-item-article">nickname</span>
                    </div>
                    {/* <div className="group-tags card_item__custom">
                        <span className="card-item-article">tags</span>
                    </div>
                    <div className="users card_item__custom">
                        <AccessibleForwardIcon />
                        <span className="card-item-article">users</span>
                    </div> */}
                </CardTitle>

            </Card>
        )
    })

    return (
        <div className="content-width">
            <div className="group-header flex-space-between">
                <h1>Friends</h1>
            </div>
            <CreatingForm group />
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                {friendsRender}
            </div>

        </div>
    )
}