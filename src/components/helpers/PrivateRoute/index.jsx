import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { setIsAuthLoading, checkAuthUser } from '../../../redux/actions/myUserActionCreator'
import { MySpinner } from '../../smallComponents/Spinner'

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { token, authLoading, isAuth } = useSelector(state => state.myUser);
    const [isLoading, setIsLoading] = useState(true)
    
    let firstRender = useRef(true)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setIsAuthLoading(true));
        dispatch(checkAuthUser(token));
    }, []);

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false
            return
        }
    
        if(!authLoading) setIsLoading(false)

    }, [authLoading])


    return (
        isLoading
            ? <MySpinner isFullSize color="dark" />
            : isAuth
                ? <Route {...rest} render={routeProps => (<RouteComponent {...routeProps} />)} />
                : <Redirect to="/signin" />
    )

}