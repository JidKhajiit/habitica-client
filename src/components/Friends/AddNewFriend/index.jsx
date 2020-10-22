import React, { useEffect, useState } from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import '../../../app.scss';
import { getUsers } from '../../../providers/friendsProvider';
import UserCard from '../../smallComponents/UserCard';


export default ({ className }) => {
    const [foundedUsers, setFoundedUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleButtonFind = async () => {
        // if (inputValue) {
            try {
                const response = await getUsers(inputValue);
                setFoundedUsers(response);

                console.log(response)
            } catch (err) {
                console.log(err)
            }
        // } else {
        //     setFoundedUsers([])
        // }

    }

    useEffect(() => {
        // dispatch(getFriendsReq())
    }, []);


    return (
        <>
            <InputGroup className={className}>
                <Input value={inputValue} onKeyUp={(event) => event.key === "Enter" && handleButtonFind()} onChange={(event) => setInputValue(event.target.value)} placeholder="Enter the username to add a new friend" />
                <InputGroupAddon addonType="append"><Button onClick={handleButtonFind} color="secondary">Find</Button></InputGroupAddon>
            </InputGroup>
            { foundedUsers && foundedUsers.map((user) => <UserCard rerender={handleButtonFind} key={user._id} type='add' user={user} />)}
        </>
    )
}