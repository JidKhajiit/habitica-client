import React, { useEffect, useState } from 'react';
import UserCard from '../../smallComponents/UserCard';
import { incomingBidForFriendshipReq } from '../../../providers/friendsProvider';
import { MySpinner } from '../../smallComponents/Spinner';


export default ({ className }) => {
    const [users, setUsers] = useState();

    const getIncomingReqsOfFriendship = async () => {
        const incomingReqs = await incomingBidForFriendshipReq()
        setUsers(incomingReqs);
    }

    useEffect(() => {
        getIncomingReqsOfFriendship()

    }, []);


    return (
        <div className={className}>
            {users ?
                users.map((user) => <UserCard rerender={getIncomingReqsOfFriendship} key={user._id} type='incoming-req' user={user} />) :
                <MySpinner fullSize />}
        </div>
    )
}