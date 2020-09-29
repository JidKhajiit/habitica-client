import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTab } from '../../redux/actions/appActionCreator';

export default props => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setHeaderTab('/home'));
    }, []);

    return (

        <div >
            <h1>Public content</h1>
        </div>
    )
}