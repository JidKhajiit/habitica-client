import React from 'react';
import { Spinner } from 'reactstrap';
import './index.scss'

export const MySpinner = ({ isFullSize = false, style: userStyle = {}, className: userClassName = "" }) => {
    if (isFullSize) {
        userClassName += " full-size-spinner"
    }
    return (
        <div style={userStyle} className={userClassName}>
            <Spinner color="dark" />
        </div>
    )
}