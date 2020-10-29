import React, { useEffect, useState } from 'react';
import UserCard from '../../smallComponents/UserCard';
import { outgoingBidForFriendshipReq } from '../../../providers/friendsProvider';
import { MySpinner } from '../../smallComponents/Spinner';


export default ({ className }) => {

    const [users, setUsers] = useState();

    const getOutgoingReqsOfFriendship = async () => {
        const outgoingReqs = await outgoingBidForFriendshipReq()
        setUsers(outgoingReqs);
    }

    useEffect(() => {
        getOutgoingReqsOfFriendship()

    }, []);


    return (
        <div className={className}>
            {users ?
                users.map((user) => <UserCard rerender={getOutgoingReqsOfFriendship} key={user._id} type='outgoing-req' user={user} />) :
                <MySpinner fullSize />}
        </div>
    )
}