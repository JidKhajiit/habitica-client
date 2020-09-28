import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, useHistory } from 'react-router-dom'
import { Spinner } from 'reactstrap'
import { setIsAuthLoading, checkAuthUser } from '../../redux/actions/userActionCreator'
import { MySpinner } from '../smallComponents/Spinner'

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { token, authLoading, isAuth } = useSelector(state => state.user);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setIsAuthLoading(true));
        dispatch(checkAuthUser(token));
    }, []);

    return (
        authLoading
            ? <MySpinner isFullSize color="dark" />
            : isAuth
                ? <Route {...rest} render={routeProps => (<RouteComponent {...routeProps} />)} />
                : <Redirect to="/signin" />
    )

}