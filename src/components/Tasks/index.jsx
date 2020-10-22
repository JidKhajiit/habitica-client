import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGroupsReq } from '../../redux/actions/groupActionCreator';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { getUsersReq } from '../../redux/actions/usersActionCreator';
import { Search } from '@material-ui/icons';

export default props => {
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(getGroupsReq());
        dispatch(getUsersReq());
    }, []);

    
    return (
        <div className="content-width">
            <Search />Tags

        </div>
    )
}