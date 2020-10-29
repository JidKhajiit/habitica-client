import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../../smallComponents/UserCard';
import { getFriendsReq } from '../../../providers/friendsProvider';
import { MySpinner } from '../../smallComponents/Spinner';


export default ({ className }) => {
    const [users, setUsers] = useState();
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
            {users ? users.map((user) => <UserCard rerender={getFriends} key={user._id} type='friend' user={user} />) : <MySpinner fullSize />}
        </div>
    )
}