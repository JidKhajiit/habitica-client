import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardTitle } from 'reactstrap';
import '../../../app.scss';
import { useHistory } from 'react-router-dom';
import UserCard from '../../helpers/UserCard';
import { getFriendsReq } from '../../../providers/friendsProvider';


export default ({ className }) => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const { friendTab } = useSelector((state => state.app))




    const getFriends = async () => {
        const friends = await getFriendsReq()
        setUsers(friends);
    }

    useEffect(() => {
        if (friendTab === 'my-friends') {
            getFriends();
        }

    }, [friendTab]);


    return (
        <div className={className}>
            {users.length && users.map((user) => <UserCard key={user._id} type='friend' user={user} />)}
        </div>
    )
}