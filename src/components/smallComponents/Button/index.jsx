import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './index.scss'

const MyButton = ({ style: userStyle = {}, className: userClassName = "", children }) => {
    return (
        <Button
            classes={{
                root: "btn-grad",
            }}
            style={userStyle}
            className={`${userClassName}`}
        >
            {children}
        </Button>
    )
}

export default MyButton