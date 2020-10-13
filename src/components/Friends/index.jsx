import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardTitle, Input, InputGroup, InputGroupAddon, Nav, NavItem, NavLink } from 'reactstrap';
import './index.scss';
import '../../app.scss';
import { useHistory } from 'react-router-dom';
import MyFriends from './MyFriends';
import MyNavItem from '../smallComponents/NavItem';
import { setFriendTab } from '../../redux/actions/appActionCreator';
import AddNewFriend from './AddNewFriend';


export default props => {
    const dispatch = useDispatch();

    const { friendTab } = useSelector((state => state.app))
    const history = useHistory();

    const handlTab = (activeTab) => {
        if (activeTab !== friendTab) dispatch(setFriendTab(activeTab))
    }

    useEffect(() => {
        dispatch(setFriendTab('my-friends'));
        // dispatch(getFriendsReq())
    }, []);

    return (
        <div className="content-width">
            <div className="group-header flex-space-between">
                <h1>Friends</h1>
            </div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        onClick={() => handlTab('my-friends')}
                        active={friendTab === 'my-friends'}
                    > My friends </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => handlTab('add-new-friend')}
                        active={friendTab === 'add-new-friend'}
                    > Add new friend </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => handlTab('incoming-reqs')}
                        disabled
                        active={friendTab === 'incoming-reqs'}
                    > Incoming Reqs </NavLink>
                </NavItem>


            </Nav>
            <AddNewFriend className={friendTab === 'add-new-friend' ? '' : 'invisible'} />
            <MyFriends className={friendTab === 'my-friends' ? '' : 'invisible'} />

        </div>
    )
}