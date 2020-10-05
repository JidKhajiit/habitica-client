import React from 'react';
import { Spinner } from 'reactstrap';
import './index.scss'

export const MySpinner = ({ fullSize, style: userStyle = {}, className: userClassName = "" }) => {
    if (fullSize) {
        userClassName += " full-size-spinner"
    }
    return (
        <div style={userStyle} className={userClassName}>
            <Spinner color="dark" />
        </div>
    )
}