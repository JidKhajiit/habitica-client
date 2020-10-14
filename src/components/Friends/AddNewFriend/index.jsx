import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import '../../../app.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getUsers } from '../../../providers/friendsProvider';
import UserCard from '../../helpers/UserCard';


export default ({ className }) => {
    const dispatch = useDispatch();
    const [foundedUsers, setFoundedUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const history = useHistory();


    const handleButtonFind = async () => {
        // if (inputValue) {
            try {
                const responce = await getUsers(inputValue);
                setFoundedUsers(responce);

                console.log(responce)
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
            { foundedUsers && foundedUsers.map((user) => <UserCard key={user._id} type='add' user={user} />)}
        </>
    )
}