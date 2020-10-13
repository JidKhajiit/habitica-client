import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import '../../../app.scss';
import { useHistory } from 'react-router-dom';


export default ({className}) => {
    const dispatch = useDispatch();
    let { users } = useSelector(state => state.users);

    const history = useHistory();



    useEffect(() => {
        // dispatch(getFriendsReq())
    }, []);


    return (
        <InputGroup className={className}>
            <Input placeholder="Enter the username to add a new friend" />

            <InputGroupAddon addonType="append"><Button color="secondary">Add</Button></InputGroupAddon>

        </InputGroup>
    )
}