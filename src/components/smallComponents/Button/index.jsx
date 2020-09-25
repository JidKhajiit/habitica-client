import React from 'react'
import { Button } from '@material-ui/core';
import './index.scss'

const MyButton = ({ onClick, style: userStyle = {}, className: userClassName = "", children }) => {
    return (
        <Button
            onClick={onClick}
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