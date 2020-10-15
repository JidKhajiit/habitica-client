import React, { useEffect, useState } from 'react';
import '../../../app.scss';
import UserCard from '../../helpers/UserCard';
import { incomingReqsOfFriendshipReq } from '../../../providers/friendsProvider';


export default ({ className }) => {
    const [users, setUsers] = useState([]);

    const getIncomingReqsOfFriendship = async () => {
        const incomingReqs = await incomingReqsOfFriendshipReq()
        setUsers(incomingReqs);
    }

    useEffect(() => {
        getIncomingReqsOfFriendship()

    }, []);


    return (
        <div className={className}>
            {users.length ?
                users.map((user) => <UserCard rerender={getIncomingReqsOfFriendship} key={user._id} type='incoming-req' user={user} />) :
                <></>}
        </div>
    )
}