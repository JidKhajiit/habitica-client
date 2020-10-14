import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardTitle } from 'reactstrap';
import '../../../app.scss';
import { useHistory } from 'react-router-dom';
import UserCard from '../../helpers/UserCard';


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



    useEffect(() => {
        // dispatch(getFriendsReq())
    }, []);


    return (
            <div className={className}>
                {users.map((user) => <UserCard key={user._id} type='friend' user={user} />)}
            </div>
    )
}