import React, { useEffect, useState } from 'react';
import '../../../app.scss';
import UserCard from '../../helpers/UserCard';
import { outgoingBidForFriendshipReq } from '../../../providers/friendsProvider';


export default ({ className }) => {

    const [users, setUsers] = useState([]);

    const getOutgoingReqsOfFriendship = async () => {
        const outgoingReqs = await outgoingBidForFriendshipReq()
        setUsers(outgoingReqs);
    }

    useEffect(() => {
        getOutgoingReqsOfFriendship()

    }, []);


    return (
        <div className={className}>
            {users.length ?
                users.map((user) => <UserCard rerender={getOutgoingReqsOfFriendship} key={user._id} type='outgoing-req' user={user} />) :
                <></>}
        </div>
    )
}